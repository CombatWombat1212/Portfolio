import "../styles/style.css";
import Layout from "../components/navigation/Layout";

import { useMountEffect } from "/scripts/hooks/useMountEffect";
import { postScreenSizeToRoot } from "/scripts/GlobalUtilities";
import Popup from "@/components/global/popup/Popup";
import { useRef, useState } from "react";

export default function App({ Component, pageProps }) {
  // TODO: add somekind of page transition animation across the whole site

  // TODO: add an easy out for people on the case study pages.  either a next or back button, skip to bottom, something that will allow them to quickly bounce around case studies

  // I am not currently using this
  useMountEffect(() => {
    postScreenSizeToRoot();
  });

  const [popup, setPopup] = useState(false);

  return (
    <>
      <Layout>
        <Popup popup={popup} setPopup={setPopup} />
        <Component popup={popup} setPopup={setPopup} {...pageProps} />
      </Layout>
    </>
  );
}
