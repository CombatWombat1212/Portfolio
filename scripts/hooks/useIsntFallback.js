import { useEffect, useState } from "react";
import useBrowser from "./useBrowser";

function useIsntFallback() {
    const { isFirefox, isSafari, browserFound } = useBrowser();
    const [isntFirefox, setIsntFirefox] = useState(false);
    const [isntSafari, setIsntSafari] = useState(false);
    const [isntFallback, setIsntFallback] = useState(false);
  
    // Use this effect to manage the isntFirefox state
    useEffect(() => {
      setIsntFirefox(!browserFound || !isFirefox || (browserFound && !isFirefox));
    }, [browserFound, isFirefox]);
  
    // Use this effect to manage the isntSafari state
    useEffect(() => {
      setIsntSafari(!browserFound || !isSafari || (browserFound && !isSafari));
    }, [browserFound, isSafari]);
  
    // Use this effect to manage the isntFallback state
    useEffect(() => {
      setIsntFallback(isntFirefox && isntSafari);
    }, [isntFirefox, isntSafari]);
  
    return {isntFallback, isntFirefox, isntSafari};
  }

  export default useIsntFallback;
  