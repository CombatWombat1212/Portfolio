import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { getMirrorStyleProp } from "@/scripts/useMirrorStyle";
import { defaultProps, PropTypes } from "prop-types";
import { useEffect, useRef, useState } from "react";

function getAdditionalHeadingClassesFromParentProps(childs, reason) {
  function addClass(obj) {
    var copy = { ...obj };
    copy.props = { ...obj.props };
    var className = copy.props.className ? copy.props.className : "";
    if (reason == "titled above") copy.props.className = `${className} section--heading__title-above`;
    return copy;
  }
  var childsCopy = childs;
  for (var i = 0; i < childs.heading.length; i++) {
    childsCopy.heading[i] = addClass(childs.heading[i]);
  }
  for (var i = 0; i < childs.columns.length; i++) {
    for (var j = 0; j < childs.columns[i].heading.length; j++) {
      childsCopy.columns[i].heading[j] = addClass(childs.columns[i].heading[j]);
    }
  }
  return childsCopy;
}

function getHeadingClasses(type) {
  var headingClasses = "";
  if (type == "h1") headingClasses += " text--h1";
  if (type == "h2") headingClasses += " text--h2";
  if (type == "h3") headingClasses += " text--h3";
  if (type == "h4") headingClasses += " text--h4";
  if (type == "h5") headingClasses += " text--h5";
  if (type == "p") headingClasses += " text--body";
  return headingClasses;
}

function Heading({ children, type, className, innerClassName, italic, innerhtml, ...props }) {
  var headingClasses = getHeadingClasses(type);
  const HeadingTag = type;

  className = className ? className : "";
  innerClassName = innerClassName ? innerClassName : "";

  const reference = useRef(null);

  if (italic) {
    innerClassName += " text--italic";
  }

  return (
    <div className={`section--heading ${headingClasses} ${className}`} ref={reference}
    {...getMirrorStyleProp(props)}
    >
      <HeadingTag className={innerClassName} {...(innerhtml !== undefined ? { dangerouslySetInnerHTML: { __html: innerhtml } } : {})}>
        {children}
      </HeadingTag>
    </div>
  );
}

Heading.defaultProps = {
  type: "h2",
};

Heading.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "p"]),
};
Heading.displayName = "Heading";
export default Heading;
export { Heading, getAdditionalHeadingClassesFromParentProps };
