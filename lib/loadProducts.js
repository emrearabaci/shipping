/* Instances */
import axios from '../configs/axiosInstance';

export async function loadProducts() {
  const allProducts = await axios.get('/product/allProducts', {
    withCredentials: false
  });
  return allProducts.data.data;
}
