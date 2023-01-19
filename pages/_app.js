import "../styles/style.css";
import Layout from "../components/navigation/Layout";

import useWindowSize from "/scripts/hooks/useWindowSize";

export default function App({ Component, pageProps }) {




  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
