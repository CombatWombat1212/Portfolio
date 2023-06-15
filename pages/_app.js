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
import ImagePrefetcher from "@/components/utilities/ImagePrefetcher";
import { ABOUT_IMGS } from "@/data/ABOUT_IMGS";
import ICONS from "@/data/ICONS";
import usePop from "@/components/global/popup/usePop";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { usePostScrollbarSizeToRoot } from "@/scripts/hooks/useScrollbarSize";

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

  const pop = usePop();

  const bp = useBreakpoint();
  useEffect(() => {
    console.log(bp);
  }, [bp]);

  const {loading} = useResponsiveUtils();

  useBrowserClass();
  usePostScrollbarSizeToRoot({update:[pop.on, loading]});

  const preFetchImages = [ABOUT_IMGS.me, ...Object.keys(ICONS).map((key) => ICONS[key])];

  return (
    <>
      <Favicon />
      <Providers>
            <LoadingScreen />
            <div className="site"
            style={{
              'opacity': loading ? '0' : '1',
              'transition': 'opacity 0.2s',
            }}
            >
              <Layout>
                <Popup pop={pop} />
                <Component pop={pop} />
                <Footer />
              </Layout>
              <ImagePrefetcher images={preFetchImages} />
            </div>
      </Providers>
    </>
  );
}
