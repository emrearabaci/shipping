/* Static Props */
import { loadShipments } from '../../lib/loadShipments';

export default function AllShipments({ allShipments }) {
  return (
    <>
      {allShipments.map((shipment, index) => (
        <div key={index}>
          <p>Product Code: {shipment.productCode}</p>
          <p>
            RequestedDate:
            {new Date(shipment.shipmentRequestedDate).toLocaleDateString(
              'tr-TR'
            )}
          </p>
          <p>RequestedTime: {shipment.shipmentRequestedTime}</p>
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const allShipments = await loadShipments();
  return { props: { allShipments } };
}
