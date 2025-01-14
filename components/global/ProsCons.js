import ICONS from "@/data/ICONS";
import { Graphic } from "../sections/Sections";

function Item({ children, type }) {
  if (type == "pro") {
    var icon = ICONS.checkmark;
  } else {
    var icon = ICONS.xmark;
  }

  return (
    <div className={`pro-con--item pro-con--${type}`}>
      <Graphic className="pro-con--icon" type="mask" img={icon} />
      <span className="pro-con--dash">-</span><span className="pro-con--copy">{children}</span>
    </div>
  );
}

function Pro({ children }) {
  return <Item type="pro">{children}</Item>;
}

function Con({ children }) {
  return <Item type="con">{children}</Item>;
}

function ProsCons({ children }) {
  return <div className="pro-con">{children}</div>;
}

Item.displayName="Item";
Pro.displayName="Pro";
Con.displayName="Con";
ProsCons.displayName="ProsCons";


export default ProsCons;

export { Pro, Con };
