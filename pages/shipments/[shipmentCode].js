/* React API */
import { useState } from 'react';

/* Next API */
import { useRouter } from 'next/router';

/* Static Props */
import { loadShipments } from '../../lib/loadShipments';

/* Hooks */
import { useForm } from '../../hooks/useForm';

/* Instances */
import axios from '../../configs/axiosInstance';

/* Components */
import SelectField from '../../components/SelectField';
import Button from '../../components/Button';

export default function ShipmentDetail({ selectedShipment }) {
  const router = useRouter();

  const [errors, setErrors] = useState([]);
  const [shipmentUpdateForm, setShipmentUpdateForm] = useForm({
    shipmentCode: selectedShipment[0].shipmentCode,
    shipmentStatus: ''
  });

  const shipmentStatusOptions = [
    {
      id: 0,
      name: 'Shipment Status Options',
      units: [
        { id: 0, value: 'q', label: 'In queue' },
        { id: 1, value: 'p', label: 'In Progress' },
        { id: 2, value: 'c', label: 'Completed' }
      ]
    }
  ];

  const updateShipmentRequest = async (event) => {
    event.preventDefault(event);
    const data = {
      shipmentUpdateForm
    };

    await axios
      .post('/shipment/updateShipment', data, {
        withCredentials: false
      })
      .then((res) => {
        console.table(res.data);
        if (res.status === 200) {
          router.replace(router.asPath);
        }
      })
      .catch((err) => {
        const errors = err.response.data.error;
        console.log(errors);
        setErrors(errors);
      });
  };

  return (
    <>
      {selectedShipment.map((shipment, index) => (
        <div key={index}>
          <p>{shipment.shipmentCode}</p>
          <p>{shipment.shipmentStatus}</p>
        </div>
      ))}

      <form>
        <SelectField
          name={'shipmentStatus'}
          placeholder={'Please Select a Shipment Status'}
          value={shipmentUpdateForm.shipmentStatus}
          options={shipmentStatusOptions}
          onChange={setShipmentUpdateForm}
        />
        <Button
          type={`submit`}
          onClick={updateShipmentRequest}
          content={`Update Status`}
        />
      </form>
    </>
  );
}

export const getStaticPaths = async () => {
  const allShipments = await loadShipments();
  const paths = allShipments.map((shipment) => {
    return {
      params: { shipmentCode: shipment.shipmentCode.toString() }
    };
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context) => {
  const shipmentCode = context.params.shipmentCode;
  const selectedShipment = await axios.get(
    '/shipment/searchShipment/' + shipmentCode
  );
  const { data } = await selectedShipment.data;

  return {
    props: { selectedShipment: data }
  };
};
