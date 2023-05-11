import { useEffect, useState } from 'react';

function useDeviceDetect() {
  const [state, setState] = useState({ isDesktopDevice: false, isMobileDevice: false });

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      )
    );
    setState({ isDesktopDevice: !mobile, isMobileDevice: mobile });
  }, []);

  return state;
}

export default useDeviceDetect;
