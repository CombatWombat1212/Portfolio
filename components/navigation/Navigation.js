import { useBreakpoint, useBreakpointUtils, useResponsiveUtils } from "@/scripts/hooks/useBreakpoint";
import NAV_ITEMS from "../../data/NAV_ITEMS";
import { NavMenuButton, NavMenu, NavItems } from "./NavItems";
import { useEffect, useRef, useState } from "react";
import useScreenWidth from "@/scripts/hooks/useScreenWidth";
import { splitPx } from "@/scripts/GlobalUtilities";


function Navigation({ globalStyle }) {
  const [open, setOpen] = useState(false);

  const nav = {
    open: open,
    setOpen: setOpen,
    items: NAV_ITEMS,
  };

  const navContainerRef = useRef(null);
  const screenWidth = useScreenWidth({ debounceTime: 200 });
  const [siteMarginWide, setSiteMarginWide] = useState(0);
  
  useEffect(() => {
    if (!navContainerRef.current) return;
    const marginLeft = getComputedStyle(navContainerRef.current).getPropertyValue("margin-left");
    const marginLeftNumeric = splitPx(marginLeft);
  
    setSiteMarginWide(prevSiteMarginWide => {
      if (prevSiteMarginWide !== marginLeftNumeric) {
        return marginLeftNumeric;
      }
      return prevSiteMarginWide;
    });
  
  }, [screenWidth, navContainerRef]);

  
  

  return (
    <>
      <nav className="nav">
        <div
          className="nav--container container container__wide"
          ref={navContainerRef}
          style={{
            "--site-margin-x_wide": `${siteMarginWide}px`,
          }}>
          <div className="nav--group nav--logo">
            <NavItems filter={"Logo"} nav={nav} />
          </div>

          <div className="nav--group nav--links d-sm-none">
            <NavItems filter={"Link"} nav={nav} />
          </div>

          <div className="nav--group nav--links d-sm-flex d-none">
            <NavMenuButton nav={nav} />
          </div>
        </div>
      </nav>

      <NavMenu nav={nav} />
    </>
  );
}

export default Navigation;
