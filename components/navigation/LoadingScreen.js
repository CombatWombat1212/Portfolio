// LoadingScreen.js
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { AnimatePresence, motion } from "framer-motion";
import useRandomString from "@/scripts/hooks/useRandomString";
import { useIntercept } from "@/scripts/contexts/InterceptContext";
import useEllipse, { Ellipse } from "@/scripts/hooks/useEllipse";
import { Graphic } from "../sections/Sections";
import { KOALAKO_IMGS } from "@/data/KOALAKO_IMGS";
import { LOADING_IMGS } from "@/data/LOADING_IMGS";
import useScrollbarWidth from "@/scripts/hooks/useScrollbarSize";

// const loadingMessages = [`test 1`, <i>test 2</i>, `test 3`, `test 4`];
{/* <i>*boots n cats n boots n cats*</i>, */}

//   `Ensure your Wii remote strap is tightly secured`,


const variants = {
  initial: { clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)" },
  animate: { clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)" },
  exit: { clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)" },
};

const LOADING_DURATION = 0.3;

function LoadingScreen() {
  const { intercept, setIntercept, routeChanging } = useIntercept();

  const { loading } = useResponsive();
  const loadingScreen = useRef(null);

  const scrollbarWidth = useScrollbarWidth();

  const routeChangeStart = () => {
    document.documentElement.classList.add("scrollauto");
    document.body.classList.add("noscroll");
    setTimeout(() => window.scroll(0, 0), 0);
  };

  const routeChangeEnd = () => {
    document.documentElement.classList.remove("scrollauto");
    document.body.classList.remove("noscroll");
  };

  const routeChangeStartHandler = (url) => {
    routeChangeStart();
  };

  const routeChangeEndHandler = () => {
    if (!loading) {
      // setTimeout(() => {
      routeChangeEnd();
      // }, (LOADING_DURATION * 1000)/4);
    }
  };

  useEffect(() => {
    if (routeChanging) routeChangeStartHandler();
    else routeChangeEndHandler();
  }, [routeChanging]);

  return (
    <div
      className="loading-screen--wrapper"
      style={{
        "--transition": `${LOADING_DURATION}s`,
        "--scrollbar-width": `${scrollbarWidth}px`,
      }}>
      <AnimatePresence>
        {intercept && (
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

  const Dot = () => {
    return <div className="loading-screen--ellipse"><Ellipse
    min={0}
    /></div>
  }

  const Img = ({img}) => {
    return <Graphic className="loading-screen--graphic" img={img}
    controls={false} type="video" autoplay={"scroll"} loop={true} muted={true}
    />
  }
  
  const loadingMessages = [
    // <>hol up<Dot /></>,
    // <>just one sec<Dot /></>,
    // <i>*elevator music*</i>,
    // `catch the game last night?`,
    // `lemme grab that for ya`,
    // `tighten your Wii remote strap`,
    // `wanna do something after this?`,
    // `we should do this more often`,
    // <i>shawty like a melody</i>,
    // <>sicko mode <i>bwaaaa</i></>,
    // `right this way`,
    // `no you hang up first`,
    // <i>*utz utz utz*</i>,
    // <>lemme check the back<Dot /></>,
    // `who turned off the lights?`,
    // <i>*dial-up noises*</i>,
    // `bleep bloop`,
    // <>where did i put that<Dot /></>,
    // `ouu good choice`,
    // `niceee`,
    // <i>*crickets*</i>,
    // <>pondering my orb<Dot /></>,
    `:-)`,
    // <Img img={LOADING_IMGS.loading_snail} />,
  ];
  

  const text = useRandomString(loadingMessages, { localStorage: true, key: "loading-screen--text" });
  return <h3 className={`loading-screen--text`}>{text}</h3>;
}

export default LoadingScreen;

export { LOADING_DURATION };

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
