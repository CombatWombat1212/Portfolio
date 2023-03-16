import "../styles/style.css";
import Layout from "../components/navigation/Layout";

import { useMountEffect } from "/scripts/hooks/useMountEffect";
import { postScreenSizeToRoot } from "/scripts/GlobalUtilities";
import Popup from "@/components/global/popup/Popup";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { getStudy } from "@/scripts/GetStudy";
import usePageTransition from "@/scripts/hooks/usePageTransition";

export default function App({ Component, pageProps }) {
  // TODO: add some kind of page transition animation across the whole site

  // TODO: add an easy out for people on the case study pages.  either a next or back button, skip to bottom, something that will allow them to quickly bounce around case studies

  // I am not currently using this
  useMountEffect(() => {
    postScreenSizeToRoot();
  });

  const [popup, setPopup] = useState(false);
  const router = useRouter();

  // const [isReadyToAnimate, setIsReadyToAnimate] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // var dur = 0.65;
  var dur = 0.65;
  var delay = 0.1;

  useEffect(() => {
    setLoaded(false);
    const handleLoad = () => {
        setLoaded(true);
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "complete") {
          handleLoad();
        }
      });
    }
    return () => {
      document.removeEventListener("readystatechange", handleLoad);
    };
  }, [router.route]);


  useEffect(() => {
    if (!loaded) {
      setTransitioning(true);
    }
  }, [router.route, loaded]);
  
  

  const incomingVariants = {
    initialState: {
      overflow: "hidden",
      clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
    },
    animateState: {
      overflow: "hidden",
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    },
    exitState: {
      overflow: "hidden",
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    },
  };

  const outgoingVariants = {
    initialState: {
      overflow: "hidden",
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    },
    animateState: {
      overflow: "hidden",
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    },
    exitState: {
      overflow: "hidden",
      clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)",
    },
  };

  const { isEntering, getTransitionVariant } = usePageTransition(incomingVariants, outgoingVariants);
  const transitionVariant = getTransitionVariant(isEntering);

  const handleTransitionEnd = () => {
    if (transitioning) {
      setLoaded(true);
      setTransitioning(false);
    }
  };
  

  return (
    <>
      <Layout>
        <Popup popup={popup} setPopup={setPopup} />

        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "instant",
            });

            setLoaded(false);
          }}>
          <motion.div
            key={router.route}
            initial={loaded ? isEntering ? "initialState" : "exitState" : "initialState"}
            animate={loaded ? isEntering ? "animateState" : "exitState" : "initialState"}
            exit={loaded ? isEntering ? "initialState" : "exitState" : "initialState"}
            className="base-page-size"
            transition={{
              duration: dur,
              ease: "easeInOut",
            }}
            variants={transitionVariant}
            onTransitionEnd={handleTransitionEnd}
            >
            <div style={{ 
              // opacity: loaded ? 1 : 0,
              // 'transition-duration': `0.1s`,
              }}>
              <Component popup={popup} setPopup={setPopup} />
            </div>
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}
