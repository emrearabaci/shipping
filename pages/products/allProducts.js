/* Static Props */
import { loadProducts } from '../../lib/loadProducts';

export default function AllProducts({ allProducts }) {
  return (
    <>
      {allProducts.map((product, index) => (
        <div key={index}>
          <p>Product Code: {product.productCode}</p>
          <p>Product Name: {product.productName}</p>
          <p>
            Product Creation Date:
            {new Date(product.productCreationDate).toLocaleString('tr-TR')}
          </p>
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const allProducts = await loadProducts();
  return { props: { allProducts } };
}
