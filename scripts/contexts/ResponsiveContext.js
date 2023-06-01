import { createContext, useContext, useState, useEffect } from 'react';
import { useResponsiveUtils } from '../hooks/useBreakpoint';

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const { isBpAndDown, loading, currentBreakpoint } = useResponsiveUtils();
  const [desktop, setDesktop] = useState(true);

  const bp = currentBreakpoint;

  // useEffect(() => {
  //   if (!isBpAndDown("md") || loading) {
  //     setDesktop(true);
  //   } else {
  //     setDesktop(false);
  //   }
  // }, [isBpAndDown("md"), loading]);


  const value = {
    ...useResponsiveUtils(),
    bp,
    loading, 
    desktop,
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  // const value = {desktop};

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};
