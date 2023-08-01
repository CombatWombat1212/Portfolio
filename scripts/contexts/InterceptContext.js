import { useRouter } from "next/router";
import React, { createContext, use, useCallback, useContext, useEffect, useRef, useState } from "react";

const InterceptContext = createContext();

// const MINIMUM_WAIT = 425;
// const MINIMUM_WAIT = 450;
const MINIMUM_WAIT = 1000;
// const MINIMUM_WAIT = 100000;
export const InterceptProvider = ({ children }) => {
  const [intercept, setIntercept] = useState(false);
  const [routeChanging, setRouteChanging] = useState(false);
  // const [ignore, setIgnore] = useState(false);
  const router = useRouter();
  // const [destination, setDestination] = useState(router.asPath);

  const routeChangeStartTimestamp = useRef(null);


  // const routeChangeStartHandler = useCallback(() => {
  //   setTimeout(() => {
  //     console.log(currentPath, destination);
  //     if (!currentPath.includes("/Explorations") || !destination.includes("/Explorations")) {
  //       routeChangeStartTimestamp.current = Date.now();
  //       setRouteChanging(true);
  //     }
  //   }, 1000);

  // }, [destination, currentPath]);

  // useEffect(() => {
  //   if (router.asPath != destination) {
  //     setDestination(router.asPath);
  //   }
  // }, [router.asPath]);

  // useEffect(() => {
  //   console.log(destination);
  // }, [router.asPath]);

  // const routeChangeStartHandler = (url) => {
  //   // if (!url.includes("/Explorations") || !router.asPath.includes("/Explorations")) {
  //     // console.log('default');
  //     routeChangeStartTimestamp.current = Date.now();
  //     setRouteChanging(true);
  //   // }else{
  //     // console.log('exception')
  //   // }
  // }

  // const routeChangeStartHandler = (url) => {
  //   if ((!router.asPath.includes("/Explorations") && !destination.includes("/Explorations")) || !ignore) {
  //     console.log('default')
  //     routeChangeStartTimestamp.current = Date.now();
  //     setRouteChanging(true);
  //   }
  // }

  // const routeChangeStartHandler = (url) => {
  //   console.log(router.asPath, url)
  //   if (router.asPath.includes("/Explorations") && url.includes("/Explorations")) {
  //     setIgnore(true);
  //     setTimeout(() => {
  //       setIgnore(false);
  //     }, 0);
  //     return;
  //   }
  //   if (ignore) return;
  //   routeChangeStartTimestamp.current = Date.now();
  //   setRouteChanging(true);
  // };



  const routeChangeStartHandler = (url) => {
      routeChangeStartTimestamp.current = Date.now();
      setRouteChanging(true);
  }


  const routeChangeEndHandler = () => {
    const duration = Date.now() - routeChangeStartTimestamp.current;
    if (duration < MINIMUM_WAIT) {
      setTimeout(() => {
        setRouteChanging(false);
        setIntercept(false);
      }, MINIMUM_WAIT - duration);
    } else {
      setRouteChanging(false);
      setIntercept(false);
    }
  };

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
    <InterceptContext.Provider value={{ intercept, setIntercept, routeChanging, 
    // ignore, setIgnore, destination, setDestination 
    }}>
      {children}
    </InterceptContext.Provider>
  );
};

export const useIntercept = () => {
  const context = useContext(InterceptContext);

  if (!context) {
    throw new Error("useIntercept must be used within a InterceptProvider");
  }

  return context;
};
