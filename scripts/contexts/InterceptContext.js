import { useRouter } from "next/router";
import React, { createContext,  useContext, useEffect, useRef, useState } from "react";

const InterceptContext = createContext();


// const MINIMUM_WAIT = 425;
const MINIMUM_WAIT = 450;
// const MINIMUM_WAIT = 100000;
export const InterceptProvider = ({ children }) => {
  const [intercept, setIntercept] = useState(false);
  const [routeChanging, setRouteChanging] = useState(false);
  const routeChangeStartTimestamp = useRef(null);

  const routeChangeStartHandler = () => {
    routeChangeStartTimestamp.current = Date.now();
    setRouteChanging(true);
  };

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

  const router = useRouter();
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
    <InterceptContext.Provider value={{ intercept, setIntercept, routeChanging}}>
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
