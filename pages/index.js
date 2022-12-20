/* Next API */
import Head from 'next/head';

/* Styles */
import styles from '../styles/pages/Index.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>shipping app | home</title>
        <meta
          name="description"
          content="Product management, planning, production, quality and forecasting system."
        />
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>

      <main className={`${styles.main}`}>
        <h4>Shipping APP</h4>
      </main>
    </>
  );
}
