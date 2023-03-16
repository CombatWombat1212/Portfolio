import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function usePageTransition(incomingVariants, outgoingVariants) {
  const router = useRouter();
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsEntering(false);
    };

    const handleRouteChangeComplete = () => {
      setIsEntering(true);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return {
    isEntering,
    getTransitionVariant: (entering) => (entering ? incomingVariants : outgoingVariants),
  };
}

export default usePageTransition;