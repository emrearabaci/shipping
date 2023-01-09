/* React API */
import { useEffect, useState } from 'react';

/* Hooks */
import { useForm } from '../../hooks/useForm';

/* Instances */
import axios from '../../configs/axiosInstance';

/* Components */
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import Button from '../../components/Button';

/* Static Props */
import { loadProducts } from '../../lib/loadProducts';

export default function NewShipment({ allProducts }) {
  const [errors, setErrors] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(undefined);

  const date = new Date(Date.now());

  const dateToString =
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString() +
    date.getDate().toString();

  const prefixOfShipmentCode =
    dateToString +
    Date.now().toString().substring(7, 13) +
    Math.floor(Math.random() * 10);

  const [newShipmentForm, setNewShipmentForm] = useForm({
    productInfo: '',
    shipmentCode: prefixOfShipmentCode,
    shipmentQuantity: '',
    shipmentFrom: '',
    shipmentTo: '',
    shipmentRequestedBy: '',
    shipmentRequestedDate: '',
    shipmentRequestedTime: '',
    shipmentDescription: '',
    shipmentCreator: 'Logged User',
    shipmentUpdater: 'Logged User!'
  });

  useEffect(() => {
    if (selectedProduct !== undefined) {
      newShipmentForm.productInfo = selectedProduct;
    } else {
      newShipmentForm.productCode = '';
      newShipmentForm.shipmentUnitPrice = '';
    }
  });
  const whichProduct = (event) => {
    setSelectedProduct(
      allProducts.find((product) => product.productCode === event.target.value)
    );
  };

  const shipmentStatus = [
    {
      id: 0,
      name: 'Shipment Status',
      units: [
        { id: 0, value: 'raw', label: 'Raw' },
        { id: 1, value: 'queue', label: 'Queue' },
        { id: 2, value: 'progress', label: 'Progress' },
        { id: 3, value: 'done', label: 'Done' }
      ]
    }
  ];

  const newShipmentRequest = async (event) => {
    event.preventDefault(event);
    const data = {
      newShipmentForm
    };

    await axios
      .post('/shipment/newShipment', data, {
        withCredentials: false
      })
      .then((res) => {
        console.table(res.data);
      })
      .catch((err) => {
        const errors = err.response.data.error;
        console.log(errors);
        setErrors(errors);
      });
  };

  return (
    <>
      <div>
        <input list={'products'} onChange={whichProduct} />
        <datalist id={'products'}>
          {allProducts.map((product) => (
            <option key={product.productCode} value={product.productCode}>
              {product.productName}
            </option>
          ))}
        </datalist>

        <form>
          <InputField
            name={`shipmentCode`}
            type={`number`}
            placeholder={`Shipment Code:`}
            value={newShipmentForm.shipmentCode}
            onChange={setNewShipmentForm}
            disabled={true}
          />
          <InputField
            name={`shipmentQuantity`}
            type={`number`}
            placeholder={`Shipment Quantity:`}
            value={newShipmentForm.shipmentQuantity}
            onChange={setNewShipmentForm}
          />
          <InputField
            name={`shipmentFrom`}
            type={`text`}
            placeholder={`Shipment From:`}
            value={newShipmentForm.shipmentFrom}
            onChange={setNewShipmentForm}
          />
          <InputField
            name={`shipmentTo`}
            type={`text`}
            placeholder={`Shipment To:`}
            value={newShipmentForm.shipmentTo}
            onChange={setNewShipmentForm}
          />
          <InputField
            name={`shipmentRequestedBy`}
            type={`text`}
            placeholder={`Shipment Requested By:`}
            value={newShipmentForm.shipmentRequestedBy}
            onChange={setNewShipmentForm}
          />
          <InputField
            name={`shipmentRequestedDate`}
            type={`date`}
            placeholder={`Shipment Requested Date:`}
            value={newShipmentForm.shipmentRequestedDate}
            onChange={setNewShipmentForm}
          />
          <InputField
            name={`shipmentRequestedTime`}
            type={`time`}
            placeholder={`Shipment Requested Time:`}
            value={newShipmentForm.shipmentRequestedTime}
            onChange={setNewShipmentForm}
          />
          <InputField
            name={`shipmentDescription`}
            type={`string`}
            placeholder={`Shipment Description:`}
            value={newShipmentForm.shipmentDescription}
            onChange={setNewShipmentForm}
          />
          <Button
            type={`submit`}
            onClick={newShipmentRequest}
            content={`Save Shipment`}
          />
        </form>
      </div>

      <div>
        {Object.keys(errors).map((error, index) => {
          return (
            <p key={index}>
              {error}: {errors[error]}
            </p>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allProducts = await loadProducts();
  return { props: { allProducts } };
}
