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
import useEllipse from "@/scripts/hooks/useEllipse";
import Footer from "@/components/navigation/Footer";
import LoadingScreen from "@/components/navigation/LoadingScreen";
import useSecret from "@/scripts/hooks/useSecret";
import useRandomString from "@/scripts/hooks/useRandomString";
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
  const characters = text.split('');
  const styledText = characters.map((char, i) => `%c${char}`).join('');
  const styles = characters.map((char, i) => `color: ${generateRainbowColor((hue + i * 15) % 360)};` +
    `font-family: "Gira Sans"; font-size: 1.4375rem;` +
    `line-height:2rem;` +
    `font-style:italic;` 
    // + `padding: 0.725rem 0.775rem 0.875rem 0.775rem;`
    + `padding-top: 0.35rem;`
    + `padding-bottom: 0.7525rem;`

    +`font-weight: 400;` 
    );
  return [styledText, ...styles];
}





export default function App({ Component, pageProps }) {
  // TODO: add an easy out for people on the case study pages.  either a next or back button, skip to bottom, something that will allow them to quickly bounce around case studies

  const secret = useSecret("password", 1000);
  const secret2 = useSecret("stop", 1000);

  useEffect(() => {
    if (!secret) return;
  
    let hue = 0;
    const interval = setInterval(() => {
      const text = !secret2 ? "eat my ass" : "no" ;
      const [waveText, ...styles] = generateWaveText(text, hue);
      console.log(waveText, ...styles);
      hue = (hue + Math.random() * 60) % 360;
    }, 40);
  
    return () => clearInterval(interval);
  }, [secret, secret2]);
  

  // I am not currently using this
  useMountEffect(() => {
    postScreenSizeToRoot();
  });

  const [popup, setPopup] = useState(false);
  const router = useRouter();

  // const [isReadyToAnimate, setIsReadyToAnimate] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [chosen, setChosen] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState([...loadingMessages]);

  // var dur = 0.65;
  var dur = 0.65;
  var delay = 0.1;

  useEffect(() => {
    setShowLoading(true);
    setLoaded(true);
  }, [router.route]);

  useEffect(() => {
    if (loaded) return;
    setTransitioning(true);
  }, [router.route, loaded]);

  const { isEntering, getTransitionVariant } = usePageTransition(incomingVariants, outgoingVariants);
  const transitionVariant = getTransitionVariant(isEntering);

  const chooseRandomMessage = () => {
    const index = Math.floor(Math.random() * unseenMessages.length);
    const chosenMessage = unseenMessages[index];
    setUnseenMessages(unseenMessages.filter((_, i) => i !== index));
    return chosenMessage;
  };

  useEffect(() => {
    if (unseenMessages.length === 0) {
      setUnseenMessages([...loadingMessages]);
    }
  }, [unseenMessages]);

  useEffect(() => {
    setChosen(chooseRandomMessage());
  }, []);

  const handleTransitionEnd = () => {
    if (transitioning) {
      setLoaded(true);
      setTransitioning(false);
      setTimeout(() => {
        setChosen(chooseRandomMessage());
        setTimeout(() => {
          setShowLoading(false);
        }, 500);
      }, dur * 1000 + 500);
    }
  };

  // TODO right now if you scroll down a page really fast on a laggy machine you can see the scroll page behind it, so we should update this so that theres actually an element in between the two pages rather than just the background behind them

  return (
    <>
      <Layout>
        <Popup popup={popup} setPopup={setPopup} />

        {/* TODO: They break when you go back in the browser */}
        {/* <AnimatePresence
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
            initial={loaded ? (isEntering ? "initialState" : "exitState") : "initialState"}
            animate={loaded ? (isEntering ? "animateState" : "exitState") : "initialState"}
            exit={loaded ? (isEntering ? "initialState" : "exitState") : "initialState"}
            className="base-page-size"
            transition={{
              duration: dur,
              ease: "backInOut",
            }}
            variants={transitionVariant}
            onTransitionEnd={handleTransitionEnd}> */}

        {/* TODO:delete this once you uncomment the rest */}
        <div className="base-page-size">
          <Component popup={popup} setPopup={setPopup} />
        </div>
        <Footer />
        {/* </motion.div>
        </AnimatePresence> */}

        {/* <LoadingScreen showLoading={showLoading} chosen={chosen} /> */}
      </Layout>
    </>
  );
}

const loadingMessages = [`hol up...`, `<i>*elevator music*</i>`, `catch the game last night?`, `lemme grab that for ya`, `Ensure your Wii remote strap is tightly secured`, `Wanna do something after this?`, `We should do this more often`, `<i>shawty like a melody</i>`, `right this way`, `<i>*utz utz utz*</i>`, `lemme check the back...`, `who turned off the lights?`, `<i>*dial-up noises*</i>`, `bleep bloop`, `now where did i put that...`, `ouu good choice`, `niceee`, `<i>*crickets*</i>`];

const incomingVariants = {
  initialState: {
    // overflow: "hidden",
    clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
  },
  animateState: {
    // overflow: "hidden",
    clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
  },
  exitState: {
    // overflow: "hidden",
    clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
  },
};

const outgoingVariants = {
  initialState: {
    // overflow: "hidden",
    clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
  },
  animateState: {
    // overflow: "hidden",
    clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
  },
  exitState: {
    // overflow: "hidden",
    clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)",
  },
};
