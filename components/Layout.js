/* Next API */
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#e6e6e6" />
        <meta name="author" content="a.emrearabaci@gmail.com" />
        <meta
          name="description"
          content="Product management, planning, production and shipment management system."
        />
        {/* <link rel='icon' href='/favicon.ico' /> */}
        <title>Welcome | shipping app</title>
      </Head>
      <main>{children}</main>
    </>
  );
}
