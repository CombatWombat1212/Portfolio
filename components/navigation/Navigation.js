import { useBreakpoint, useBreakpointUtils, useResponsiveUtils } from "@/scripts/hooks/useBreakpoint";
import NAV_ITEMS from "../../data/NAV_ITEMS";
import { NavMenuButton, NavMenu, NavItems } from "./NavItems";
import { useEffect, useState } from "react";

// TODO: make nav change colors when scrolling over sections that match its color
// TODO: make the case study item a dropdown

function Navigation() {

  // const { isBpAndDown } = useResponsiveUtils({ debounceTime: 0 });


  const [open, setOpen] = useState(false);

  const nav ={
    open: open,
    setOpen: setOpen,
    items: NAV_ITEMS,
  }



  return (
    <>
      <nav className="nav">
        <div className="nav--container container container__wide">
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
