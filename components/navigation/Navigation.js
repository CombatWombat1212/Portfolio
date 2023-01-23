import NAV_ITEMS from "../../data/NAV_ITEMS";
import NavLink from "../navigation/NavLink";

function Navigation() {
  return (
    <>
      <nav className="nav">
        <div className="nav--container container container__wide">
          <div className="nav--group nav--logo">
            {NAV_ITEMS.filter((item) => item.type == "Logo").map((item) => {
              return <NavLink key={item.key} item={item} />;
            })}
          </div>

          <div className="nav--group nav--links">
            {NAV_ITEMS.filter((item) => item.type == "Link").map((item) => {
              return <NavLink key={item.key} item={item} />;
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
