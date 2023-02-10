import { defaultProps, PropTypes } from "prop-types";
import Graphic from "./Graphic";
import { chevron_right } from "@/data/ICONS";
import { addClassNoRepeats, addClassToJsxObj } from "./sections_utilities/ClassUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { anchoredArrowsInit } from "./sections_utilities/AnchoredArrows";


function ColumnGroup({ columns, arrows, mainType }) {
  arrows = arrows || false;
  var hasArrows = arrows ? true : false;

  if (arrows == true) arrows = "primary";
  var arrowClasses = `arrow--mask arrow--mask__default mask__${arrows}`;


  var hasAboveCaptions = false;
  for (var i = 0; i < columns.length; i++) {
    if (columns[i].props.caption == "above") {
      hasAboveCaptions = true;
      break;
    }
  }

  useMountEffect(() => {
    if (!hasAboveCaptions) return;
    anchoredArrowsInit();
  });




  return (
    <>
      {columns.map((column, i) => {
        var { graphic, heading, title, description, quote, other, props } = columns[i];

        var colClasses = "";
        var otherClasses = "";

        if (mainType == "flex") {
          colClasses = `col-${Math.floor(12 / columns.length)}`;
          otherClasses = "";
          if (props.classes.colClasses.length != 0) colClasses = props.classes.colClasses.join(" ");
          if (props.classes.otherClasses.length != 0) otherClasses = props.classes.otherClasses.join(" ");
        }

        var attrProps = { ...props };
        delete attrProps.classes;
        delete attrProps.children;
        var caption = attrProps.caption ? attrProps.caption : false;

        if (caption == "above") description = addClassToJsxObj(description, "graphic--caption__above");

        if (caption == "above") {
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

function Column({ children, className }) {
  return <div className={`section--column ${className ? className : ""}`}>{children}</div>;
}

export { Column, ColumnGroup };
