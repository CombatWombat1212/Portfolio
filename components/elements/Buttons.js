//Libraries
import Image from "next/image";
import propTypes from "prop-types";

//Data
import ICONS from "../../data/ICONS";

//Utilities

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

function Button({ children, className, type, icon, animation,color, ...props }) {
  if (icon) var [iconName, iconSide, iconType] = icon;

  return (
    <>
      <DLink
        className={
            "button" +
            (className ? ` ${className}` : "") +
            (type ? ` button__${type}` : "") +
            (color ? ` button__${color}` : "") +
            (iconSide ? ` button__${iconSide}` : "") +
            (animation ? ` button__${animation}` : "")
        }
        tabIndex="0"
        {...props}>
        {icon ? (
          <>
            {iconSide == "left" || (iconSide == "alone" && <ButtonIcon img={iconName} type={iconType}></ButtonIcon>)}
            {iconSide != "alone" && <ButtonCopy>{children}</ButtonCopy>}
            {iconSide == "right" && <ButtonIcon img={iconName} type={iconType}></ButtonIcon>}
          </>
        ) : (
          <>{iconSide != "alone" && <ButtonCopy>{children}</ButtonCopy>}</>
        )}
      </DLink>
    </>
  );
}

Button.defaultProps = {
  type: "regular",
  color: "secondary",
};

Button.propTypes = {
  color: propTypes.oneOf(["primary", "secondary"]),
  type: propTypes.oneOf(["regular", "bottom"]),
};

export default Button;
