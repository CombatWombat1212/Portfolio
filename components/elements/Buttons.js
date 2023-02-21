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
          {iconSide == "left" || (iconSide == "alone" && <ButtonIcon img={iconName} type={iconType}></ButtonIcon>)}
          {iconSide != "alone" && <ButtonCopy>{children}</ButtonCopy>}
          {iconSide == "right" && <ButtonIcon img={iconName} type={iconType}></ButtonIcon>}
        </>
      ) : (
        <>{iconSide != "alone" && <ButtonCopy>{children}</ButtonCopy>}</>
      )}
    </>
  );
}

// function Button({ children, className, type, icon, animation, color, tag, ...props }) {
//   if (icon) var [iconName, iconSide, iconType] = icon;

//   const isA = tag == "a" ? true : false;

//   return (
//     <>
//       {isA ? (
//         <DLink className={"button" + (className ? ` ${className}` : "") + (type ? ` button__${type}` : "") + (color ? ` button__${color}` : "") + (iconSide ? ` button__${iconSide}` : "") + (animation ? ` button__${animation}` : "")} tabIndex="0" {...props}>
//           <Inner className={className} type={type} icon={icon} animation={animation} color={color} tag={tag} {...props}>
//             {children}
//           </Inner>
//         </DLink>
//       ) : (
//         <div className={"button" + (className ? ` ${className}` : "") + (type ? ` button__${type}` : "") + (color ? ` button__${color}` : "") + (iconSide ? ` button__${iconSide}` : "") + (animation ? ` button__${animation}` : "")} tabIndex="0" {...props}>
//           <Inner className={className} type={type} icon={icon} animation={animation} color={color} tag={tag} {...props}>
//             {children}
//           </Inner>
//         </div>
//       )}
//     </>
//   );
// }

function Button({ children, className, type, icon, animation, color, tag = 'button', ...props }) {
  const ButtonWrapper = tag === 'a' ? DLink : tag;

  const [iconName, iconSide, iconType] = icon || [];

  const buttonClasses = ['button'];
  if (className) buttonClasses.push(className);
  if (type) buttonClasses.push(`button__${type}`);
  if (color) buttonClasses.push(`button__${color}`);
  if (iconSide) buttonClasses.push(`button__${iconSide}`);
  if (animation) buttonClasses.push(`button__${animation}`);

  return (
    <ButtonWrapper className={buttonClasses.join(' ')} tabIndex="0" {...props}>
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
  color: propTypes.oneOf(["primary", "secondary", "tertiary", "transparent-primary", "transparent-secondary", "transparent-tertiary", "transparent-background", "background-primary", "background-secondary"]),
  type: propTypes.oneOf(["regular", "bottom"]),
  tag: propTypes.oneOf(["a", "div"]),
};

export default Button;
