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

function Inner({ children, className, type, icon, animation, color, tag, ...props }) {
  if (typeof icon == "string") icon = icon.split(" ");
  if (icon?.length < 3) console.error("Button icon prop must be a string with 3 values separated by spaces, or an array of those same three values. These are the values: [iconName, iconSide, iconType]. Icon name must match the name of the imported image in the ICONS.js file.  The iconSide value must be either 'left', 'right', or 'alone'. The iconType value must be either 'img' or 'mask ");

  if (icon) var [iconName, iconSide, iconType] = icon;

  return (
    <>
      {icon ? (
        <>
          {iconSide == "left" || (iconSide == "alone" || iconSide == "middle") && <ButtonIcon img={iconName} type={iconType}></ButtonIcon>}
          {iconSide != "alone" && iconSide != "middle" && <ButtonCopy>{children}</ButtonCopy>}
          {iconSide == "right" && <ButtonIcon img={iconName} type={iconType}></ButtonIcon>}
        </>
      ) : (
        <>{iconSide != "alone" && iconSide != "middle" && <ButtonCopy>{children}</ButtonCopy>}</>
      )}
    </>
  );
}

function Button({ children, className, type, icon, animation, color, tag, reference, ...props }) {
  const [iconName, iconSide, iconType] = icon || [];

  const buttonClasses = ['button'];
  if (className) buttonClasses.push(className);
  if (type) buttonClasses.push(`button__${type}`);
  if (color) buttonClasses.push(`button__${color}`);
  if (iconSide) buttonClasses.push(`button__${iconSide}`);
  if (animation) buttonClasses.push(`button__${animation}`);

  var tabIndex = tag === 'a' ? 0 : null;

  const commonProps = {
    className: buttonClasses.join(' '),
    tabIndex: tabIndex,
    reference: reference,
    ...props
  };



  const ButtonWrapper = tag;

  return tag === 'a' ? (
    <DLink {...commonProps}>
      <Inner className={className} type={type} icon={icon} animation={animation} color={color} tag={tag} {...props}>
        {children}
      </Inner>
    </DLink>
  ) : (
    <ButtonWrapper {...commonProps} ref={reference}>
      <Inner className={className} type={type} icon={icon} animation={animation} color={color} tag={tag} {...props}>
        {children}
      </Inner>
    </ButtonWrapper>
  );
}





Button.defaultProps = {
  type: "regular",
  color: "secondary",
  tag: "a",
};

Button.propTypes = {
  color: propTypes.oneOf(["primary", "secondary", "tertiary", "transparent-primary", "transparent-secondary", "transparent-tertiary", "transparent-background", "background-primary", "background_darkest-primary", "background-secondary", "background-tertiary"]),
  type: propTypes.oneOf(["regular", "bottom"]),
  tag: propTypes.oneOf(["a", "div"]),
};

export default Button;
