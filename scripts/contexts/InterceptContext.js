import { useRouter } from "next/router";
import React, { createContext, use, useContext, useEffect, useState } from "react";

const InterceptContext = createContext();

export const InterceptProvider = ({ children }) => {
  const [intercept, setIntercept] = useState(false);
  const [routeChanging, setRouteChanging] = useState(false);

  const routeChangeStartHandler = () => {
    setRouteChanging(true);
  };

  const routeChangeEndHandler = () => {
    setRouteChanging(false);
    setIntercept(false);
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
