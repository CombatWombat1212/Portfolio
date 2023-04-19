import { defaultProps, PropTypes } from "prop-types";
import Graphic from "./Graphic";
import { chevron_right } from "@/data/ICONS";
import { addClassNoRepeats, addClassToJsxObj } from "./sections_utilities/ClassUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { anchoredArrowsInit, removeExcessArrows } from "./sections_utilities/ArrowUtilities";
import { colLineInit } from "./sections_utilities/ColLineUtilities";
import { useEffect, useRef, useState } from "react";
import useSameHeight from "@/scripts/hooks/useSameHeight";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";

function ColumnGroup({ columns, arrows, line, mainType }) {
  arrows = arrows || false;
  var hasArrows = arrows ? true : false;
  var hasAnchoredArrows = typeof arrows == "string" && arrows.includes("anchored") ? true : false;

  if (arrows == true) arrows = "primary";
  if (hasAnchoredArrows) arrows = arrows.replace("anchored", "").trim();
  var arrowClasses = `arrow--mask arrow--mask__default mask__${arrows}`;

  // var hasAboveCaptions = false;
  // for (var i = 0; i < columns.length; i++) {
  //   if (columns[i].props.caption == "above") {
  //     hasAboveCaptions = true;
  //     break;
  //   }
  // }

  var hasLine = line;

  // TODO: this mount effect runs twice on the first load for some reason
  useMountEffect(() => {
    if (!hasLine) return;
    colLineInit();
  });

  const { desktop } = useResponsive();

  return (
    <>
      {hasLine && <div className="col-line--wrapper">{/* <div className="col-line"></div> */}</div>}

      {columns.map((column, i) => {
        var { graphic, heading, title, description, quote, other, props } = columns[i];

        var colClasses = "";
        var otherClasses = "";

        if (mainType == "flex") {
          colClasses = (() => {
            var pref = "e-col-";
            // if(!Number.isInteger(12 / columns.length)){
            //   pref = "col-"
            // }

            if (desktop) {
              return `${pref}${Math.floor(12 / columns.length)}`;
            } else {
              return `${pref}${Math.min(12, Math.floor(12 / (columns.length / 2)))}`;
            }
          })();

          otherClasses = "";
          if (props.classes.colClasses.length != 0) colClasses = props.classes.colClasses.join(" ");
          if (props.classes.otherClasses.length != 0) otherClasses = props.classes.otherClasses.join(" ");
        }

        var attrProps = { ...props };
        delete attrProps.classes;
        delete attrProps.children;
        delete attrProps.className;
        var caption = attrProps.caption ? attrProps.caption : false;

        if (caption == "above") {
          description = addClassToJsxObj(description, "graphic--caption__above");
        }

        if (caption == "above" || hasAnchoredArrows) {
          arrowClasses = arrowClasses.replace("arrow--mask__default", "");
          arrowClasses = addClassNoRepeats(arrowClasses, "arrow--mask__anchored");
        }

        return (
          <Column className={`column ${colClasses} ${otherClasses}`} key={`column ${i}`} {...attrProps}>
            {hasArrows && i != 0 && (
              <div className="arrow--column">
                <Graphic className="arrow--wrapper" innerClassName={arrowClasses} type="mask" img={chevron_right}></Graphic>
              </div>
            )}

            {title && <>{title}</>}

            {!caption && (
              <>
                {graphic && <>{graphic}</>}
                {heading && <>{heading}</>}
                {description && <>{description}</>}
              </>
            )}

            {caption == "above" && (
              <>
                {heading && <>{heading}</>}
                {description && <>{description}</>}
                {graphic && <>{graphic}</>}
              </>
            )}

            {caption == "split" && (
              <>
                {heading && <>{heading}</>}
                {graphic && <>{graphic}</>}
                {description && <>{description}</>}
              </>
            )}

            {quote && <>{quote}</>}
            {other && <>{other}</>}
          </Column>
        );
      })}
    </>
  );
}

ColumnGroup.defaultProps = {
  mainType: "flex",
};

ColumnGroup.propTypes = {
  mainType: PropTypes.oneOf(["flex", "grid"]),
};

function Column({ children, className, sameHeight }) {
  className = className ? className : "";

  const reference = useRef(null);
  sameHeight = sameHeight ? sameHeight : false;
  const sameHeightObj = useSameHeight(sameHeight, reference, { resize: "horizontal" });
  const styles = {
    ...(sameHeightObj
      ? {
          height: !sameHeightObj.resizing ? `${sameHeightObj.height.max}px` : "auto",
        }
      : {}),
  };

  return (
    <>
      <div className={`section--column ${className}`} ref={reference} style={styles}>
        {children}
      </div>
    </>
  );
}

export { Column, ColumnGroup };
