//Libraries
import Image from "next/image";
import propTypes from "prop-types";

//Data
import ICONS from "../../data/ICONS";

//Utilities

//Components
import Mask from "../utilities/Mask";
import DLink from "../utilities/DynamicLink";
import { useEffect, useRef, useState } from "react";

function useCreateCopy(copyProp) {
  const mouseInRef = useRef(false);
  const [mouseIn, _setMouseIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timer = useRef(null);
  const timeout = 400;

  const setMouseIn = (data) => {
    mouseInRef.current = data;
    _setMouseIn(data);
  };

  const copy = {
    bool: Boolean(copyProp),
    text: copyProp,
  };

  const copyOnClickHandler = async () => {
    setClicked(true);
    if (copy.bool) {
      try {
        await navigator.clipboard.writeText(copy.text);
        setCopied(true);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const copyOnMouseEnterHandler = () => {
    setMouseIn(true);
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const copyOnMouseLeaveHandler = () => {
    setMouseIn(false);
    setClicked(false);
    if (!timer.current) {
      timer.current = setTimeout(() => {
        if (!mouseInRef.current) {
          setCopied(false);
        }
      }, timeout);
    }
  };

  copy.handlers = {
    copy: copyOnClickHandler,
    onMouseEnter: copyOnMouseEnterHandler,
    onMouseLeave: copyOnMouseLeaveHandler,
  };

  const copyOnClickProp = copy.bool ? { onClick: copy.handlers.copy } : {};
  const copyOnMouseEnterProp = copy.bool ? { onMouseEnter: copy.handlers.onMouseEnter } : {};
  const copyOnMouseLeaveProp = copy.bool ? { onMouseLeave: copy.handlers.onMouseLeave } : {};
  copy.props = copy.bool ? { ...copyOnClickProp, ...copyOnMouseEnterProp, ...copyOnMouseLeaveProp } : {};

  return copy;
}

function Button({ children, className, type, icon, animation, color, tag, reference, copy: copyProp, target = "_self", ...props }) {
  const [iconName, iconSide, iconType] = icon || [];

  const copy = useCreateCopy(copyProp);

  const buttonClasses = ["button"];
  if (className) buttonClasses.push(className);
  if (type) buttonClasses.push(`button__${type}`);
  if (color) buttonClasses.push(`button__${color}`);
  if (iconSide) buttonClasses.push(`button__${iconSide}`);
  if (animation) buttonClasses.push(`button__${animation}`);

  var tabIndex = tag === "a" ? 0 : null;

  const commonProps = {
    className: buttonClasses.join(" "),
    tabIndex: tabIndex,
    reference: reference,
    target,
    ...copy.props,
    ...props,
  };

  const ButtonWrapper = tag === "a" ? DLink : tag;

  const buttonProps = {
    className,
    type,
    icon,
    animation,
    color,
    tag,
    copy,
    ...props,
  };

  const wrapperProps = tag === "a" ? { ...commonProps } : { ...commonProps, ref: reference };

  return (
    <ButtonWrapper {...wrapperProps}>
      <Inner {...buttonProps}>{children}</Inner>
    </ButtonWrapper>
  );
}

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

function buttonInnerThrowErrors(icon) {
  if (icon?.length < 3)
    console.error(
      "Button icon prop must be a string with 3 values separated by spaces, or an array of those same three values. These are the values: [iconName, iconSide, iconType]. Icon name must match the name of the imported image in the ICONS.js file.  The iconSide value must be either 'left', 'right', or 'alone'. The iconType value must be either 'img' or 'mask "
    );
}






function Inner({ children, className, type, icon, animation, color, tag, copy, ...props }) {
  if (typeof icon == "string") icon = icon.split(" ");
  buttonInnerThrowErrors(icon);
  if (icon) var [iconName, iconSide, iconType] = icon;



  const Body = () => {
    return (
      <>
        {icon && (iconSide === "alone" || iconSide === "middle" || iconSide === "left") && <ButtonIcon img={iconName} type={iconType} />}
        {iconSide !== "alone" && iconSide !== "middle" && <ButtonCopy>{children}</ButtonCopy>}
        {icon && iconSide === "right" && <ButtonIcon img={iconName} type={iconType} />}
      </>
    );
  };

  return <Body />;
}






Button.defaultProps = {
  type: "regular",
  color: "secondary",
  tag: "a",
};

Button.propTypes = {
  color: propTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "transparent-primary",
    "transparent-secondary",
    "transparent-tertiary",
    "transparent-background",
    "background-primary",
    "background_darkest-primary",
    "background-secondary",
    "background-tertiary",
  ]),
  type: propTypes.oneOf(["regular", "bottom"]),
  tag: propTypes.oneOf(["a", "div"]),
};

export default Button;
