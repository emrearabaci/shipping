/* Static Props */
import { loadProducts } from '../../lib/loadProducts';

/* Instances */
import axios from '../../configs/axiosInstance';

export default function ProductDetail({ selectedProduct }) {
  return (
    <>
      {selectedProduct.map((product, index) => (
        <div key={index}>
          <p>{product.productCode}</p>
        </div>
      ))}
    </>
  );
}

export const getStaticPaths = async () => {
  const allProducts = await loadProducts();
  const paths = allProducts.map((product) => {
    return {
      params: { productCode: product.productCode.toString() }
    };
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context) => {
  const productCode = context.params.productCode;
  const selectedProduct = await axios.get(
    '/product/searchProduct/' + productCode
  );
  const { data } = await selectedProduct.data;

  return {
    props: { selectedProduct: data }
  };
};
