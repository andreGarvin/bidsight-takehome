import type { AppProps } from "next/app";

// components
import Head from 'components/Common/Head';

// styles
import "styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const AppName = process.env.NEXT_PUBLIC_APP_NAME as string;

  return (
    <>
      <Head
        favico="/favicon.png"
        title={AppName.replace("-", " - ")}
        description="Create and manage invoices"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
