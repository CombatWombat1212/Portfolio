
import DLink from "../utilities/DynamicLink";


function NavLink({ item }) {
  return (
    <>

    
      <DLink className="nav--item" href={item.link} aria-label={item.ariaLabel}>
        {item.text}
      </DLink>



    </>
  );
}

export default NavLink;
