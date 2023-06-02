import { useState, useEffect } from 'react';

const useBrowser = () => {
  const [browser, setBrowser] = useState('');
  const [isChrome, setIsChrome] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isOpera, setIsOpera] = useState(false);
  const [isEdge, setIsEdge] = useState(false);
  const [browserFound, setBrowserFound] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    
    if (userAgent.indexOf("Chrome") > -1) {
      setBrowser('Chrome');
      setIsChrome(true);
      setBrowserFound(true);
    } else if (userAgent.indexOf("Safari") > -1) {
      setBrowser('Safari');
      setIsSafari(true);
      setBrowserFound(true);
    } else if (userAgent.indexOf("Firefox") > -1) {
      setBrowser('Firefox');
      setIsFirefox(true);
      setBrowserFound(true);
    } else if (userAgent.indexOf("Edge") > -1) {
      setBrowser('Edge');
      setIsEdge(true);
      setBrowserFound(true);
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
      setBrowser('Opera');
      setIsOpera(true);
      setBrowserFound(true);
    } else {
      setBrowser(userAgent);
      setBrowserFound(true);
    }
  }, []);

  return { browser, isChrome, isFirefox, isSafari, isOpera, isEdge, browserFound };
};

export default useBrowser;
