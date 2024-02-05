
import NextHead from "next/head";

type AppHeadType = {
  title: string;
  favico: string;
  description: string;
}

const AppHead: React.FC<AppHeadType> = (props) => {
  const { title, description, favico } = props;

  const information = `${title} - ${description}`;
  return (
    <NextHead>
      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{information}</title>
      <meta name="description" content={information} />

      <meta property="og:site_name" content={information} />
      <meta property="og:locale" content="en_us" />
      <meta property="og:type" content="website" />

      <link rel="icon" type="image/png" href={favico} />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

      <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} />
    </NextHead>
  );
}

export default AppHead;
