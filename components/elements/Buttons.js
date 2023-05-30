//Libraries
import Image from "next/image";
import propTypes from "prop-types";

//Data
import ICONS from "../../data/ICONS";

//Utilities

//Components
import Mask from "../utilities/Mask";
import DLink from "../utilities/DynamicLink";
import React, { useEffect, useRef, useState } from "react";

function useCreateCopy(copyProp, message) {
  const mouseInRef = useRef(false);
  const [mouseIn, _setMouseIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timer = useRef(null);
  const timeout = 600;

  const setMouseIn = (data) => {
    mouseInRef.current = data;
    _setMouseIn(data);
  };

  const copy = {
    bool: Boolean(copyProp),
    text: copyProp,
    copied,
    ...(Boolean(message) ? { message: message } : {}),
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

function Button({ children, className, type, icon, animation, color, tag, reference, copy: copyProp, message, target = "_self", ...props }) {
  const [iconName, iconSide, iconType] = icon || [];

  const copy = useCreateCopy(copyProp, message);

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
      <ButtonInner {...buttonProps}>{children}</ButtonInner>
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

function buttonButtonInnerThrowErrors(icon) {
  if (icon?.length < 3)
    console.error(
      "Button icon prop must be a string with 3 values separated by spaces, or an array of those same three values. These are the values: [iconName, iconSide, iconType]. Icon name must match the name of the imported image in the ICONS.js file.  The iconSide value must be either 'left', 'right', or 'alone'. The iconType value must be either 'img' or 'mask "
    );
}

function ButtonInner(props) {
  const { copy } = props;

  const classes = {
    inner: [],
    // "copy-feedback": [],
  };

  Object.keys(classes).forEach((key) => {
    classes[key].push(`button--${key}`);
    if (copy.bool) classes[key].push(`button--${key}__${copy.copied ? "copied" : "default"}`);
  });

  Object.keys(classes).forEach((key) => {
    classes[key] = classes[key].join(" ");
  });

  return (
    <>
      <div className={classes["inner"]}>
        <InnerBody {...props} />
        {copy.bool && <span className="button--copy button--copy-feedback">{copy.message || "Copied!"}</span>}
      </div>
    </>
  );
}

function InnerBody({ children, className, type, icon, animation, color, tag, copy, ...props }) {
  if (typeof icon == "string") icon = icon.split(" ");
  buttonButtonInnerThrowErrors(icon);
  if (icon) var [iconName, iconSide, iconType] = icon;

  const isAlone = iconSide === "alone";
  const isMiddle = iconSide === "middle";
  const isLeft = iconSide === "left";
  const isRight = iconSide === "right";

  const iconProps = {
    img: iconName,
    type: iconType,
  };

  return (
    <>
      {icon && (isAlone || isMiddle || isLeft) && <ButtonIcon {...iconProps} />}
      {!isAlone && !isMiddle && <ButtonCopy>{children}</ButtonCopy>}
      {icon && isRight && <ButtonIcon {...iconProps} />}
    </>
  );
}

Button.displayName = "Button";
ButtonCopy.displayName = "ButtonCopy";
ButtonIcon.displayName = "ButtonIcon";
ButtonInner.displayName = "ButtonInner";
InnerBody.displayName = "InnerBody";

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
