import Image from "next/image";
import { defaultProps, PropTypes } from "prop-types";
import React from "react";
import Mask from "../utilities/Mask";

var backgroundColors = ["background", "primary", "secondary", "makeright tertiary"];

function getHeadingClasses(type) {
  var headingClasses = "section--heading";
  if (type == "h1") headingClasses += " h1";
  if (type == "h2") headingClasses += " h2";
  if (type == "h3") headingClasses += " h3";
  if (type == "h4") headingClasses += " h4";
  return headingClasses;
}

function Heading({ children, type }) {
  var headingClasses = getHeadingClasses(type);

  return (
    <div className={headingClasses}>
      {type == "h1" && <h1>{children}</h1>}
      {type == "h2" && <h2>{children}</h2>}
      {type == "h3" && <h3>{children}</h3>}
      {type == "h4" && <h4>{children}</h4>}
    </div>
  );
}

Heading.defaultProps = {
  type: "h2",
};

Heading.propTypes = {
  type: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
};

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

function Column({ children, className }) {
  return <div className={`section--column ${className ? className : ""}`}>{children}</div>;
}

function Graphic({ type, img }) {
  var isImg = type == "image";
  var isMask = type == "mask";

  return (
    <>
      {isImg && <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />}
      {isMask && <Mask src={img.src} alt={img.alt} width={img.width} height={img.height} />}
    </>
  );
}

Graphic.defaultProps = {
  type: "image",
};

Graphic.propTypes = {
  type: PropTypes.oneOf(["image", "mask"]),
};


function Background() {
  return <div></div>;
}

function getSectionChildren(children) {
  var columns = [],
    description = [],
    title = [],
    heading = [],
    graphic = [];

  var columns = children.filter((child) => child.type.name == "Column") || null;

  if (columns.length == 0) {
    description = children.filter((child) => child.type.name == "Description") || null;
    title = children.filter((child) => child.type.name == "Title") || null;
    heading = children.filter((child) => child.type.name == "Heading") || null;
    graphic = children.filter((child) => child.type.name == "Graphic") || null;
  } else {
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i];
      var columnChildren = column.props.children;
      var columnDescription = columnChildren.filter((child) => child.type.name == "Description") || null;
      var columnTitle = columnChildren.filter((child) => child.type.name == "Title") || null;
      var columnHeading = columnChildren.filter((child) => child.type.name == "Heading") || null;
      var columnGraphic = columnChildren.filter((child) => child.type.name == "Graphic") || null;

      description.push(columnDescription);
      title.push(columnTitle);
      heading.push(columnHeading);
      graphic.push(columnGraphic);
    }
  }

  return { columns, description, title, heading, graphic };
}

function getMainClasses(pref, type, align) {
  if (pref == undefined) pref = `${pref}`;
  var mainClasses = `${pref}`;
  if (type == undefined) return mainClasses;
  if (type == "background") mainClasses += ` ${pref}__background`;
  if (type == "pitch") mainClasses += ` ${pref}__pitch`;
  if (align == "center") mainClasses += ` ${pref}__center`;
  if (align == "right") mainClasses += ` ${pref}__right`;
  if(SECTION_TYPE_C.indexOf(type) != -1) mainClasses += ' gap-4';

  return mainClasses;
}

function getContainerMarginClass(margin) {
  var containerMarginClass = " container";
  if (margin == undefined) return containerMarginClass;
  // if (margin == "regular") containerMarginClass += " container__regular";
  if (margin == "wide") containerMarginClass += " container__wide";

  return containerMarginClass;
}

function getWrapperClasses(pref, background) {
  if (pref == undefined) pref = "section";

  var wrapperClasses = `${pref}--wrapper`;
  if (background == undefined) return wrapperClasses;

  if (typeof background == "string") {
    if (backgroundColors.indexOf(background) != -1) {
      if (pref == "chapter" && background != "background") wrapperClasses += ` ${pref}__color`;
      else if (pref == "section") wrapperClasses += ` ${pref}__color`;
    }

    if (background == "primary") wrapperClasses += ` ${pref}__primary`;
    if (background == "makeright tertiary") wrapperClasses += ` ${pref}__makeright-tertiary`;
    if (background == "background") wrapperClasses += ` ${pref}__background`;
  } else if (typeof background == "object") {
    wrapperClasses += ` ${pref}__image`;
  }

  return wrapperClasses;
}

function getHasBackground(background) {
  var hasBackground = false;
  if (background != "background") hasBackground = true;
  return hasBackground;
}

function getHasText(childs) {
  var hasText = false;
  var { description, title, heading, graphic } = childs;
  if (description.length != 0 || title.length != 0 || heading.length != 0) hasText = true;
  return hasText;
}

function getHasGraphic(graphic) {
  var hasGraphic = false;
  hasGraphic = graphic.length != 0;
  return hasGraphic;
}

const SECTION_TYPE_A = ["default", "background", "logo banner"];
const SECTION_TYPE_B = ["pitch"];
const SECTION_TYPE_C = ["columns"];

function Section({ children, type, background, id, margin, align }) {
  var pref = "section";

  if (children == undefined) return null;
  if (children.length == undefined) children = [children];

  var childs = getSectionChildren(children);
  var { columns, description, title, heading, graphic } = childs;

  var mainClasses = getMainClasses(pref, type, align);
  var containerMarginClass = getContainerMarginClass(margin);
  var wrapperClasses = getWrapperClasses(pref, background);

  var hasText = getHasText(childs);
  var hasGraphic = getHasGraphic(graphic);

  // var hasBackground = getHasBackground(background);




  return (
    <>
      <div id={id} className={wrapperClasses}>
        <div className="test"></div>
        <div className="section--inner">
          <div className={mainClasses + containerMarginClass}>
            {SECTION_TYPE_A.indexOf(type) != -1 ? (
              <>
                {hasText && (
                  <div className="section--copy">
                    {title && <>{title}</>}
                    {heading && <>{heading}</>}
                    {description && <>{description}</>}
                  </div>
                )}

                {hasGraphic && (
                  <>
                    <div className="section--graphic">
                      <>{graphic}</>
                    </div>
                  </>
                )}
              </>
            ) : SECTION_TYPE_B.indexOf(type) != -1 ? (
              <>
                <div className="section--copy col-4">
                  <>{graphic[0]}</>
                  {heading && <>{heading}</>}
                  {description && <>{description}</>}
                </div>
                <div className="section--graphic col-8">
                  <>{graphic[1]}</>
                </div>
              </>
            ) : SECTION_TYPE_C.indexOf(type) != -1 ? (
              <>
                {columns.map((column, i) => {
                  return (
                    <Column className={`col-${12 / columns.length}`} key={`column ${i}`}>
                      {graphic[i] && <>{graphic[i]}</>}
                      {heading[i] && <>{heading[i]}</>}
                      {description[i] && <>{description[i]}</>}
                    </Column>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );

}

Section.defaultProps = {
  background: "none",
  margin: "regular",
  align: "left",
  type: "default",
};

Section.propTypes = {
  margin: PropTypes.oneOf(["regular", "wide"]),
  align: PropTypes.oneOf(["left", "center", "right"]),
  type: PropTypes.oneOf(["default", "columns", "background", "logo banner", "pitch"]),

  background: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf(["none", ...backgroundColors])]),
};

// TODO: section and chapter background should be able to be set with an image, and named colors

function Chapter({ children, type, background, id, margin, align }) {
  var pref = "chapter";

  var wrapperClasses = getWrapperClasses(pref, background);
  var mainClasses = getMainClasses(pref, type, align);

  return (
    <div id={id} className={wrapperClasses}>
      <div className={mainClasses}>{children}</div>
    </div>
  );
}

Chapter.defaultProps = Section.defaultProps;
Chapter.propTypes = Section.propTypes;

export default Section;
export { Section, Chapter, Description, Column, Title, Heading, Graphic };
