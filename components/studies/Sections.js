import Image from "next/image";
import { defaultProps, PropTypes } from "prop-types";
import React from "react";
import Mask from "../utilities/Mask";

function Heading({ children }) {
  return (
    <div className="section--heading">
      <h2>{children}</h2>
    </div>
  );
}

function Title({ children }) {
  var title = children;
  title = title.toUpperCase();

  return (
    <div className="section--title">
      <h4>{title}</h4>
    </div>
  );
}

function Description({ children }) {
  return <div className="section--description">{children}</div>;
}

function Graphic({ type, img }) {
  var isImg = type == "image";
  var isMask = type == "mask";

  return (
    <>
      {isImg && <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />}
      {isMask && <Mask className="" src={img.src} alt={img.alt} width={img.width} height={img.height} />}
    </>
  );
}

Graphic.defaultProps = {
  type: "image",
};

Graphic.propTypes = {
  type: PropTypes.oneOf(["image", "mask"]),
};

function Section({ children, type, background, id, margin, align }) {
  if (children == undefined) return null;
  if (children.length == undefined) children = [children];

  var description = children.filter((child) => child.type.name == "Description") || null;
  var title = children.filter((child) => child.type.name == "Title") || null;
  var heading = children.filter((child) => child.type.name == "Heading") || null;
  var graphic = children.filter((child) => child.type.name == "Graphic") || null;

  var sectionClasses = " section";
  if (type == "background") sectionClasses += " section__background";

  var containerType = "";
  if (margin == "regular") containerType = "container";
  if (margin == "wide") containerType = "container container__wide";

  var wrapperClasses = "section--wrapper";
  var hasBackground = false;
  if (background != "background") hasBackground = true;
  if (background == "primary") wrapperClasses += " section__color section__primary";

  var hasText = false;
  if (description.length != 0 || title.length != 0 || heading.length != 0) hasText = true;

  if (align == "center") sectionClasses += " section__center";
  if (align == "right") sectionClasses += " section__right";

  return (
    <>
      <div id={id} className={wrapperClasses}>
        <div className={"section" + ` ${containerType}` + sectionClasses}>
          {hasText && (
            <div className="section--copy">
              {title && <>{title}</>}
              {heading && <>{heading}</>}
              {description && <>{description}</>}
            </div>
          )}

          {graphic && (
            <>
              <div className="section--graphic">
                <>{graphic}</>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

Section.defaultProps = {
  background: "background",
  margin: "regular",
  align: "left",
};

Section.propTypes = {
  margin: PropTypes.oneOf(["regular", "wide"]),
  background: PropTypes.oneOf(["background", "primary", "secondary"]),
  align: PropTypes.oneOf(["left", "center", "right"]),
};

export default Section;
export { Section, Description, Title, Heading, Graphic };
