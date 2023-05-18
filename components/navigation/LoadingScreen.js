// LoadingScreen.js
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { AnimatePresence, motion } from "framer-motion";
import useRandomString from "@/scripts/hooks/useRandomString";

const loadingMessages = [
  `test 1`,
  <i>test 2</i>,
  `test 3`,
  `test 4`,
];
// const loadingMessages = [
//   `hol up...`,
//   `<i>*elevator music*</i>`,
//   `catch the game last night?`,
//   `lemme grab that for ya`,
//   `Ensure your Wii remote strap is tightly secured`,
//   `Wanna do something after this?`,
//   `We should do this more often`,
//   `<i>shawty like a melody</i>`,
//   `sicko mode <i>bwaaaa</i>`,
//   `right this way`,
//   `<i>*utz utz utz*</i>`,
//   `<i>*boots n cats n boots n cats*</i>`,
//   `lemme check the back...`,
//   `who turned off the lights?`,
//   `<i>*dial-up noises*</i>`,
//   `bleep bloop`,
//   `where did i put that...`,
//   `ouu good choice`,
//   `niceee`,
//   `<i>*crickets*</i>`,
// ];

const variants = {
  initial: { clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)" },
  animate: { clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)" },
  exit: { clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)" },
};

const LOADING_DURATION = 0.3;
const DELAY = 0.2;

function LoadingScreen() {
  const [show, setShow] = useState(false);

  const { loading } = useResponsive();
  const loadingRef = useRef(loading);
  const loadingScreen = useRef(null);

  const router = useRouter();

  const routeChangeStart = () => {
    document.documentElement.classList.add("scrollauto");
    document.body.classList.add("noscroll");
    setTimeout(() => window.scroll(0, 0), LOADING_DURATION * 1000 * 1.15);
  };

  const routeChangeEnd = () => {
    setShow(false);
    document.documentElement.classList.remove("scrollauto");
    document.body.classList.remove("noscroll");
  };

  const routeChangeStartHandler = (url) => {
    // if (url === "/#Home") {
    //   router.push("/");
    // }
    setShow(true);
    routeChangeStart();
  };

  const routeChangeEndHandler = () => {
    if (!loadingRef.current) {
      setTimeout(() => {
        routeChangeEnd();
      }, LOADING_DURATION * 1000 * 1.15 + DELAY * 1000);
    }
  };

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    router.events.on("routeChangeStart", routeChangeStartHandler);
    router.events.on("routeChangeComplete", routeChangeEndHandler);
    router.events.on("routeChangeError", routeChangeEndHandler);

    return () => {
      router.events.off("routeChangeStart", routeChangeStartHandler);
      router.events.off("routeChangeComplete", routeChangeEndHandler);
      router.events.off("routeChangeError", routeChangeEndHandler);
    };
  }, [router.events]);

  return (
    <div
      className="loading-screen--wrapper"
      style={{
        "--transition": `${LOADING_DURATION}s`,
      }}>
      <AnimatePresence>
        {show && (
          <motion.div
            className={`loading-screen`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            ref={loadingScreen}
            transition={{
              duration: LOADING_DURATION,
              ease: "easeInOut",
            }}>
            <Text />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Text() {
  const text = useRandomString(loadingMessages, { localStorage: true, key: "loading-screen--text" });

  return <h3 className={`loading-screen--text`}>{text}</h3>;
}

export default LoadingScreen;

// const ellipse = useEllipse(450, 3, 1);

// const router = useRouter();

// // const [isReadyToAnimate, setIsReadyToAnimate] = useState(false);
// const [loaded, setLoaded] = useState(false);
// const [transitioning, setTransitioning] = useState(false);
// const [showLoading, setShowLoading] = useState(true);
// const [chosen, setChosen] = useState(null);

// const [unseenMessages, setUnseenMessages] = useState([...loadingMessages]);

// // var dur = 0.65;
// var dur = 0.65;
// var delay = 0.1;

// useEffect(() => {
//   setShowLoading(true);
//   setLoaded(true);
// }, [router.route]);

// useEffect(() => {
//   if (loaded) return;
//   setTransitioning(true);
// }, [router.route, loaded]);

// const { isEntering, getTransitionVariant } = usePageTransition(incomingVariants, outgoingVariants);
// const transitionVariant = getTransitionVariant(isEntering);

// const chooseRandomMessage = () => {
//   const index = Math.floor(Math.random() * unseenMessages.length);
//   const chosenMessage = unseenMessages[index];
//   setUnseenMessages(unseenMessages.filter((_, i) => i !== index));
//   return chosenMessage;
// };

// useEffect(() => {
//   if (unseenMessages.length === 0) {
//     setUnseenMessages([...loadingMessages]);
//   }
// }, [unseenMessages]);

// useEffect(() => {
//   setChosen(chooseRandomMessage());
// }, []);

// const handleTransitionEnd = () => {
//   if (transitioning) {
//     setLoaded(true);
//     setTransitioning(false);
//     setTimeout(() => {
//       setChosen(chooseRandomMessage());
//       setTimeout(() => {
//         setShowLoading(false);
//       }, 500);
//     }, dur * 1000 + 500);
//   }
// };

// useEffect(() => {
//   const handleRouteChange = () => {
//     window.scrollTo(0, 0);
//   };

//   router.events.on('routeChangeComplete', handleRouteChange);

//   // If the component is unmounted, unsubscribe
//   // from the event with the `off` method
//   return () => {
//     router.events.off('routeChangeComplete', handleRouteChange);
//   };
// }, [router.events]);

// const navConRef = useRef(null);
// const width = useScreenWidth({ debounceTime: 200});
// const [siteMarginWide, setSiteMarginWide] = useState(0);

// const global = {
//   margin:{
//     wide: siteMarginWide,
//     setWide: setSiteMarginWide,
//   },
//   refs: {
//     navCon: navConRef,
//   }
// }
