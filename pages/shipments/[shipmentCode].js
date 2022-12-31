/* Static Props */
import { loadShipments } from '../../lib/loadShipments';

/* Instances */
import axios from '../../configs/axiosInstance';

export default function ShipmentDetail({ selectedShipment }) {
  return (
    <>
      {selectedShipment.map((shipment, index) => (
        <div key={index}>
          <p>{shipment.shipmentCode}</p>
        </div>
      ))}
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
