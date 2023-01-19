//Libraries
import Image from "next/image";
import { useRef } from "react";

//Data
import ICONS from "../../data/ICONS";

//Utilities
import {addAttrNonDestructive} from "../../scripts/GlobalUtilities";

//Components
import Mask from "../utilities/Mask";
import DLink from "../utilities/DynamicLink";
















function ButtonCopy({ children }) {
  return <span className="button--copy">{children}</span>;
}

function ButtonIcon({ img, type }) {
  if (img) var iconImg = ICONS[img];

  return (
    <>
      <div className="button--img">
        {type == "mask" ? (
          <>
            <Mask className="button--icon button--icon__mask" src={iconImg.src} alt={iconImg.alt} width={iconImg.width} height={iconImg.height} />
          </>
        ) : (
          <>
            <Image className="button--icon button--icon__img" src={iconImg.src} alt={iconImg.alt} width={iconImg.width} height={iconImg.height} />
          </>
        )}
      </div>
    </>
  );
}


function Button({ children, className, type, icon, ...props }) {
  

  if (icon) {
    var [iconName, iconSide, iconType] = icon;
  }


  return (
    <>
      <DLink className={"button" + (className ? ` ${className}` : "") + (type ? ` button__${type}` : "") + (iconSide ? ` button__${iconSide}` : "")} tabIndex="0" {...props}>
        {icon ? (
          <>
            {iconSide == "left" && <ButtonIcon img={iconName} type={iconType}></ButtonIcon>}
            <ButtonCopy>{children}</ButtonCopy>
            {iconSide == "right" && <ButtonIcon img={iconName} type={iconType}></ButtonIcon>}
          </>
        ) : (
          <ButtonCopy>{children}</ButtonCopy>
        )}
      </DLink>
    </>
  );
}

export default Button;
