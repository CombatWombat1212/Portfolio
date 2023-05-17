// LoadingScreen.js
import React, { useEffect, useRef, useState } from "react";
import Router, { useRouter } from "next/router";

import useEllipse from "@/scripts/hooks/useEllipse";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import AnimPres from "../global/AnimPres";
import popAnims from "../global/popup/popup_utilities/PopupAnimations";

const animations = {
  wipeIn: {
    hidden: {
      clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)",
    },
    visible: {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    },
    exit: {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    },
  },
  wipeOut: {
    hidden: {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    },
    visible: {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    },
    exit: {
      clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)",
    },
  },
};

// This approach works although i theorize that it might not be as widely supported on all browsers:
// const promiseScrollToTop = () => {
//   return new Promise((resolve) => {
//     if (document.documentElement.scrollTop != 0 || document.body.scrollTop != 0) {
//       window.scroll(0, 0);
//       window.onscroll = function () {
//         if (document.documentElement.scrollTop == 0 && document.body.scrollTop == 0) {
//           resolve();
//         }
//       };
//     } else {
//       resolve();
//     }
//   });
// };

// const routeChangeStart = () => {
//   setLoading(true);
//   document.documentElement.classList.add("scrollauto");
//   promiseScrollToTop().catch((err) => {
//     console.log(err);
//   });
// };

// const routeChangeEnd = () => {
//   if (document.documentElement.scrollTop == 0 && document.body.scrollTop == 0) {
//     setLoading(false);
//     document.documentElement.classList.remove("scrollauto");
//   } else {
//     console.log("Page is not scrolled to top. routeChangeEnd logic cannot run");
//   }
// };

// This approach might have better support but again this wasn't tested just like the above, and as it turns out just having a delay of 0 ended up working as well, but here is the 2 promise approach:
// const applyScrollAuto = () => {
//   return new Promise((resolve, reject) => {
//     if (document.documentElement.classList.contains('scrollauto')) {
//       reject('scrollauto is already applied');
//     } else {
//       document.documentElement.classList.add('scrollauto');
//       document.documentElement.style.scrollBehavior = 'auto';
//       resolve();
//     }
//   });
// };

// const scrollToTop = () => {
//   return new Promise((resolve, reject) => {
//     if (document.documentElement.scrollTop != 0 || document.body.scrollTop != 0) {
//       window.scroll(0, 0);
//       window.onscroll = function() {
//         if (document.documentElement.scrollTop == 0 && document.body.scrollTop == 0) {
//           resolve();
//         }
//       };
//     } else {
//       resolve();
//     }
//   });
// };

// const routeChangeStart = () => {
//   setLoading(true);
//   applyScrollAuto()
//     .then(() => {
//       return scrollToTop();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// const routeChangeEnd = () => {
//   if (document.documentElement.scrollTop == 0 && document.body.scrollTop == 0) {
//     setLoading(false);
//     document.documentElement.classList.remove('scrollauto');
//   } else {
//     console.log('Page is not scrolled to top. routeChangeEnd logic cannot run');
//   }
// };

function LoadingScreen() {
  const [show, setShow] = useState(false);

  const { loading } = useResponsive();
  const loadingRef = useRef(loading);

  const router = useRouter();

  const routeChangeStart = () => {
    setShow(true);
    document.documentElement.classList.add("scrollauto");
    setTimeout(() => window.scroll(0, 0), 0);
  };
  const routeChangeEnd = () => {
    if (!loadingRef.current) {
      setShow(false);
      document.documentElement.classList.remove("scrollauto");
    }
  };

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeEnd);
    router.events.on("routeChangeError", routeChangeEnd);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeEnd);
      router.events.off("routeChangeError", routeChangeEnd);
    };
  }, [router.events]);

  return (
    <AnimPres className={`loading-screen--wrapper`} condition={show} animation={popAnims.slideFade}>
      <Wrapper />
    </AnimPres>
  );
}

function Wrapper() {
  return (
    <div className={`loading-screen`}>
      <h3 className={`loading-screen--text`}>test</h3>
    </div>
  );
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
