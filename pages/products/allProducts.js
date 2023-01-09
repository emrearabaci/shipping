/* Static Props */
import { loadProducts } from '../../lib/loadProducts';
import Link from 'next/link';

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
          <Link href={`/products/${encodeURIComponent(product.productCode)}`}>
            {product.productCode}
          </Link>
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const allProducts = await loadProducts();
  return { props: { allProducts } };
}
