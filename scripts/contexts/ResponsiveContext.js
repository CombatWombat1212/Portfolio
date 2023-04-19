import { createContext, useContext, useState, useEffect } from 'react';
import { useResponsiveUtils } from '../hooks/useBreakpoint';

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const { isBpAndDown, loading } = useResponsiveUtils();
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    if (!isBpAndDown("md") || loading) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }
  }, [isBpAndDown("md"), loading]);


  // const value = {
  //   ...useResponsiveUtils(),
  //   desktop,
  //   setDesktop,
  // };

  const value = {desktop};

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
