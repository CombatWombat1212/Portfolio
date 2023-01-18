import Image from "next/image";

import Mask from "../utilities/Mask";
import ICONS from "../../data/ICONS";

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
            <Mask className="button--icon button--icon__mask" img={iconImg} />
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

function Button({ children, className, type, icon }) {
  if (icon) {
    var [iconName, iconSide, iconType] = icon;
  }

  return (
    <>
      <a className={"button" + (className ? ` ${className}` : "") + (type ? ` button__${type}` : "") + (iconSide ? ` button__${iconSide}` : "")} tabIndex="0">
        {icon ? (
          <>
            {iconSide == "right" && <ButtonCopy>{children}</ButtonCopy>}

            <ButtonIcon img={iconName} type={iconType}></ButtonIcon>

            {iconSide == "left" && <ButtonCopy>{children}</ButtonCopy>}
          </>
        ) : (
          <ButtonCopy>{children}</ButtonCopy>
        )}
      </a>
    </>
  );
}

export default Button;
