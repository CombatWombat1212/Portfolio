import "../styles/style.css";
import Layout from "../components/navigation/Layout";

import { useMountEffect } from "/scripts/hooks/useMountEffect";
import { postScreenSizeToRoot } from "/scripts/GlobalUtilities";

export default function App({ Component, pageProps }) {

  // TODO: add somekind of page transition animation across the whole site

  // I am not currently using this
  useMountEffect(() => {
    postScreenSizeToRoot();
  });


  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
