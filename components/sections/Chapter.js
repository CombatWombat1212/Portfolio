import React, { useEffect, useRef } from "react";
import Section, { SECTION_DEFAULT_PROPS, SECTION_PROP_TYPES } from "./Sections";
import { getWrapperClasses, getBackgroundClasses, getElemClasses } from "./sections_utilities/GetClasses";
import { Next } from "../studies/NextStudies";

// TODO: Chapter backgrounds are depreciated and can be removed

function Chapter({ children, type, wrapperClassName, background, id, name, margin, study }) {
  var pref = "chapter";

  var wrapperClasses = getWrapperClasses(wrapperClassName, pref);
  var backgroundClasses = getBackgroundClasses(pref, background);
  var elemClasses = getElemClasses(pref, type);

  var lastChildHasBackground = false;

  if (typeof children === "undefined") children = [<></>];
  if (children.length > 0) {
    var lastChild = children[children.length - 1];
    if (
      lastChild.props.background != undefined &&
      lastChild.props.background != null &&
      lastChild.props.background != "" &&
      lastChild.props.background != "none"
    ) {
      lastChildHasBackground = true;
    }
  }

  // Clone the children array so that we can modify it without affecting the original
  var newChildren = React.Children.toArray(children);
  if (!Array.isArray(newChildren)) newChildren = [newChildren];

  // Add a wrapper class to each child that has a background color, so that we can add padding to the bottom of the child
  newChildren = newChildren.map((child, i) => {
    if (i < children.length - 1) {
      var nextSibling = children[i + 1];
      var nextSiblingBackground = nextSibling.props.background;
      if (nextSiblingBackground && nextSiblingBackground !== "none") {
        const wrapperClassName = child.props.wrapperClassName ? `${child.props.wrapperClassName} pb-section-gap` : "pb-section-gap";
        return React.cloneElement(child, { wrapperClassName });
      }
    }
    return child;
  });

  function getSectionBackground(children, index) {
    const child = children[index];
    if (child && typeof child.props?.background === "object") {
      return "image";
    }
    const result = (children.length > 0 && child?.props?.background) || "none";
    return result;
  }

  const chapBackgrounds = {
    first: getSectionBackground(newChildren, 0),
    last: getSectionBackground(newChildren, newChildren.length - 1),
  };

  // TODO: update the logic surrounding this so that it is able to check the first and last sections of other chapters and use that to determine when the background needs padding
  newChildren = newChildren.map((child, i) => {
    if (newChildren.length === 1) return child; // Do not add wrapperClassName if there's only one child
    if (i != newChildren.length - 1) return child;
    if (!child.props.background || child.props.background != "none") return child;
    const wrapperClassName = child.props.wrapperClassName ? `${child.props.wrapperClassName} pb-section-gap` : "pb-section-gap";
    return React.cloneElement(child, { wrapperClassName });
  });

  // // Old
  // newChildren = newChildren.map((child, i) => {
  //   if (i != newChildren.length - 1) return child;
  //   if (!child.props.background || child.props.background != "none") return child;
  //   const wrapperClassName = child.props.wrapperClassName ? `${child.props.wrapperClassName} pb-section-gap` : 'pb-section-gap';
  //   return React.cloneElement(child, { wrapperClassName });
  // });

  // bug testing
  // newChildren = newChildren.map((child, i) => {
  //   if (i != newChildren.length - 1) {
  //     console.log(`Not last child. Returning ${child}`);
  //     return child;
  //   }
  //   if (!child.props.background || child.props.background != "none") {
  //     console.log(`Last child doesn't meet criteria. Returning ${child}`);
  //     return child;
  //   }
  //   const wrapperClassName = child.props.wrapperClassName ? `${child.props.wrapperClassName} pb-section-gap` : 'pb-section-gap';
  //   console.log(`wrapperClassName for last child: ${wrapperClassName}`);
  //   return React.cloneElement(child, { wrapperClassName });
  // });

  const isClosing = id.startsWith("Closing") || name.startsWith("Closing");

  return (
    <div
      id={id}
      className={`${wrapperClasses} ${backgroundClasses} ${lastChildHasBackground ? "pb-0" : ""}`}
      name={name ? name : ""}
      last-section-background={chapBackgrounds.last}
      first-section-background={chapBackgrounds.first}>
      <div className={elemClasses}>
        {newChildren}
        {isClosing && <Next study={study}/>}
      </div>
    </div>
  );
}

Chapter.displayName = "Chapter";
Chapter.defaultProps = SECTION_DEFAULT_PROPS;
Chapter.propTypes = SECTION_PROP_TYPES;

export default Chapter;
