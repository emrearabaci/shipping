/* Instances */
import axios from '../configs/axiosInstance';

export async function loadShipments() {
  const allShipments = await axios.get('/shipment/allShipments', {
    withCredentials: false
  });
  return allShipments.data.data;
}
