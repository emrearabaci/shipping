/* Next API */
import Head from 'next/head';

/* Styles */
import styles from '../styles/pages/Index.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage | shipping app</title>
      </Head>

      <main className={`${styles.main}`}>
        <h4>Shipping APP</h4>
      </main>
    </>
  );
}
