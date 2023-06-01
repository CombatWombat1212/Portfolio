import "../styles/style.css";
import Layout from "../components/navigation/Layout";

import { postScreenSizeToRoot } from "/scripts/GlobalUtilities";
import Popup from "@/components/global/popup/Popup";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { getStudy } from "@/scripts/GetStudy";
import usePageTransition from "@/scripts/hooks/usePageTransition";
import Footer from "@/components/navigation/Footer";
import LoadingScreen from "@/components/navigation/LoadingScreen";
import useSecret from "@/scripts/hooks/useSecret";
import useRandomString from "@/scripts/hooks/useRandomString";
import { useBreakpoint, useResponsiveUtils } from "@/scripts/hooks/useBreakpoint";
import Providers from "@/scripts/contexts/Providers";
import Favicon from "@/components/head/Favicon";
import useBrowserClass from "@/scripts/hooks/useBrowserClass";

// const style =
// `font-family: "Gira Sans"; font-size: 1.4375rem;` +
// // +`line-height:2rem;`
// `line-height:2rem;` +
// `font-style:italic;` +
// `font-weight: 400;  color: ${generateRainbowColor(hue)};` +
// // +`padding: 0.225rem 0.775rem 1.375rem 0.775rem;`;
// `padding: 0.725rem 0.775rem 0.875rem 0.775rem;`;

function generateRainbowColor(hue) {
  return `hsl(${hue}, 100%, 50%)`;
}

function generateWaveText(text, hue) {
  const characters = text.split("");
  const styledText = characters.map((char, i) => `%c${char}`).join("");
  const styles = characters.map(
    (char, i) =>
      `color: ${generateRainbowColor((hue + i * 15) % 360)};` +
      `font-family: "Gira Sans"; font-size: 1.4375rem;` +
      `line-height:2rem;` +
      `font-style:italic;` +
      // + `padding: 0.725rem 0.775rem 0.875rem 0.775rem;`
      `padding-top: 0.35rem;` +
      `padding-bottom: 0.7525rem;` +
      `font-weight: 400;`
  );
  return [styledText, ...styles];
}

export default function App({ Component, pageProps }) {
  // TODO: add an easy out for people on the case study pages.  either a next or back button, skip to bottom, something that will allow them to quickly bounce around case studies

  // const secret = useSecret("password", 1000);
  // const secret2 = useSecret("stop", 1000);

  // useEffect(() => {
  //   if (!secret) return;

  //   let hue = 0;
  //   const interval = setInterval(() => {
  //     const text = !secret2 ? "eat my ass" : "no" ;
  //     const [waveText, ...styles] = generateWaveText(text, hue);
  //     console.log(waveText, ...styles);
  //     hue = (hue + Math.random() * 60) % 360;
  //   }, 40);

  //   return () => clearInterval(interval);
  // }, [secret, secret2]);

  // I am not currently using this
  // useMountEffect(() => {
  //   postScreenSizeToRoot();
  // });

  // const [popup, setPopup] = useState(false);

  const [popupType, setPopupType] = useState(false);
  const [popupImg, setPopupImg] = useState(false);
  const [popupZoom, setPopupZoom] = useState(false);
  const [popupOn, setPopupOn] = useState(false);
  const [popupGroup, setPopupGroup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(false);
  const [popupUiVisible, popupSetUIVisible] = useState(true);
  const [popupImgLoaded, setPopupImgLoaded] = useState(false);
  const [popupImgDrawn, setPopupImgDrawn] = useState(false);
  const [popupInfoDrawn, setPopupInfoDrawn] = useState(false);
  const [popupDrawn, setPopupDrawn] = useState(false);
  const [popupSeekCooldown, setPopupSeekCooldown] = useState(false);

  const [imgReady, setImgReady] = useState(false);
  const [firstImgReady, setFirstImgReady] = useState(false);
  const [firstImgDrawn, setFirstImgDrawn] = useState(false);

  const pop = {
    type: popupType,
    setType: setPopupType,
    img: popupImg,
    setImg: setPopupImg,
    zoom: popupZoom,
    setZoom: setPopupZoom,
    on: popupOn,
    setOn: setPopupOn,
    onRef: useRef(popupOn),
    group: popupGroup,
    setGroup: setPopupGroup,
    index: popupIndex,
    setIndex: setPopupIndex,
    imgLoaded: popupImgLoaded,
    setImgLoaded: setPopupImgLoaded,
    drawn: popupDrawn,
    setDrawn: setPopupDrawn,
    seekCooldown: popupSeekCooldown,
    setSeekCooldown: setPopupSeekCooldown,
    imgReady: imgReady,
    setImgReady: setImgReady,
    firstImgReady: firstImgReady,
    setFirstImgReady: setFirstImgReady,
    firstImgDrawn: firstImgDrawn,
    setFirstImgDrawn: setFirstImgDrawn,
    imgDrawn: popupImgDrawn,
    setImgDrawn: setPopupImgDrawn,
    infoDrawn: popupInfoDrawn,
    setInfoDrawn: setPopupInfoDrawn,

    ui: {
      visible: popupUiVisible,
      setVisible: popupSetUIVisible,
    },
  };

  const bp = useBreakpoint();
  useEffect(() => {
    console.log(bp);
  }, [bp]);

  useBrowserClass();

  return (
    <>
      <Favicon />
      <Providers>
        <LoadingScreen />
        <div className="site">
          <Layout>
            <Popup pop={pop} />
            <Component pop={pop} />
            <Footer />
          </Layout>
        </div>
      </Providers>
    </>
  );
}
