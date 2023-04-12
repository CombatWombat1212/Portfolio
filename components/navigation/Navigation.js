import { useBreakpoint, useBreakpointUtils, useResponsiveUtils } from "@/scripts/hooks/useBreakpoint";
import NAV_ITEMS from "../../data/NAV_ITEMS";
import NavLink from "../navigation/NavLink";
import { useEffect } from "react";
import NavMenu from "./NavMenu";

// TODO: make nav change colors when scrolling over sections that match its color
// TODO: make the case study item a dropdown

function Navigation() {
  const { isBpAndDown } = useResponsiveUtils({ debounceTime: 0 });

  return (
    <>
      <nav className="nav">
        <div className="nav--container container container__wide">
          <div className="nav--group nav--logo">
            {NAV_ITEMS.filter((item) => item.type == "Logo").map((item) => {
              return <NavLink key={item.key} item={item} />;
            })}
          </div>

          {!isBpAndDown("md") && (
            <div className="nav--group nav--links">
              {NAV_ITEMS.filter((item) => item.type == "Link").map((item) => {
                return <NavLink key={item.key} item={item} />;
              })}
            </div>
           )}
          {isBpAndDown("md") && (
            <div className="nav--group nav--links">
                <NavMenu items={NAV_ITEMS} />;
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
