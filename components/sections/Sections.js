import { defaultProps, PropTypes } from "prop-types";
import React from "react";
import Background from "../utilities/Background";

import { getElemClasses, getContainerMarginClass, getWrapperClasses, getMainClasses, getGapClasses, getBackgroundClasses, getColClassList } from "./sections_utilities/GetClasses";
import { getHasText, getHasGraphic, getHasBackground } from "./sections_utilities/IfHas";
import { getSectionChildren } from "./sections_utilities/GetSectionChildren";

import Graphic from "./Graphic";
import Quote from "./Quote";
import Heading, { getAdditionalHeadingClassesFromParentProps } from "./Heading";
import Title from "./Title";
import Description from "./Description";
import { Column, ColumnGroup } from "./Columns";

const DEFINED_CHILDREN = ["Column", "Description", "Title", "Heading", "Graphic", "Quote"];
const BACKGROUND_COLORS = ["background", "background darker", "background darkest", "primary", "secondary", "tertiary", "tertiary light", "makeright tertiary"];

// TODO: at some point these should be re-ordered in a way that's more logical, maybe that would include more descriptive names but they're really hard to think of for something as abstract as this
// and background should really be renammed to something else because in this case it means a literal section describing background information, but everywhere else in this file it refers to the background color
const SECTION_TYPE_A = ["default", "overview", "logo banner"];
const SECTION_TYPE_B = ["pitch"];
const SECTION_TYPE_C = ["columns"];
const SECTION_TYPE_D = ["split header"];
const SECTION_TYPES = [...SECTION_TYPE_A, ...SECTION_TYPE_B, ...SECTION_TYPE_C];

function Section({ className, children, type, background, id, margin, titled, arrows, mainClassName,mainType }) {
  var pref = "section";

  // TODO: the 'columns' concept should work with all variants of section i think

  if (children == undefined) return null;
  if (children.length == undefined) children = [children];

  var childs = getSectionChildren(children);
  var { columns, description, title, heading, graphic, other } = childs;

  titled = titled || false;
  var isTitled = titled ? true : false;

  if (titled == "above") childs = getAdditionalHeadingClassesFromParentProps(childs, "titled above");

  var elemClasses = getElemClasses(pref, type, titled);
  var containerMarginClass = getContainerMarginClass(margin);
  var wrapperClasses = getWrapperClasses(pref);
  var backgroundClasses = getBackgroundClasses(pref, background);
  
  var mainClasses = getMainClasses(mainClassName, mainType, titled);

  var gapClasses = getGapClasses(type, arrows, mainClassName);

  var hasText = getHasText(childs);
  var hasGraphic = getHasGraphic(graphic);
  var hasBackground = getHasBackground(background);

  return (
    <>
      <div id={id} className={wrapperClasses + backgroundClasses}>
        {hasBackground && typeof background == "object" && (
          <>
            <Background img={background} />
          </>
        )}
        <div className="section--inner">
          <div className={`${elemClasses} ${containerMarginClass} ${className ? className : ""} ${isTitled ? "" : gapClasses}`}>
            {SECTION_TYPE_A.indexOf(type) != -1 ? (
              <>
                {hasText && (
                  <div className="section--copy">
                    {title && <>{title}</>}
                    {heading && <>{heading}</>}
                    {other && <>{other}</>}
                    {description && <>{description}</>}
                  </div>
                )}

                {hasGraphic && <>{graphic}</>}
              </>
            ) : SECTION_TYPE_B.indexOf(type) != -1 ? (
              <>
                <div className="section--copy col-3">
                  <>{graphic[0]}</>
                  {heading && <>{heading}</>}
                  {description && <>{description}</>}
                </div>
                <div className="col-8">
                  <>{graphic[1]}</>
                </div>
              </>
            ) : SECTION_TYPE_C.indexOf(type) != -1 ? (
              <>
                {isTitled && (
                  <div className="section--copy col-12">
                    {title && <>{title}</>}
                    {heading && <>{heading}</>}
                    {description && <>{description}</>}
                  </div>
                )}
                {isTitled ? (
                  <div className={`section--main ${gapClasses} ${mainClasses}`}>
                    <ColumnGroup columns={columns} arrows={arrows} mainType={mainType} />
                  </div>
                ) : (
                  <ColumnGroup columns={columns} arrows={arrows} mainType={mainType} />
                )}
                {graphic && <>{graphic}</>}
                {other && <>{other}</>}
              </>
            ) : SECTION_TYPE_D.indexOf(type) != -1 ? (
              <></>
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
  type: "default",
  className: "",
  mainType: "flex",
};

Section.propTypes = {
  margin: PropTypes.oneOf(["regular", "wide", "none"]),
  mainType: PropTypes.oneOf(["flex", "grid"]),
  type: PropTypes.oneOf(SECTION_TYPES),
  background: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf(["none", ...BACKGROUND_COLORS])]),
};

// TODO: might be worth checking if this is working properly, specifically the two variables below
var SECTION_DEFAULT_PROPS = Section.defaultProps;
var SECTION_PROP_TYPES = Section.propTypes;
import Chapter from "./Chapter";
export { SECTION_DEFAULT_PROPS, SECTION_PROP_TYPES };

export default Section;
export { Section, Chapter, Description, Column, Title, Heading, Graphic, Quote };
export { SECTION_TYPE_A, SECTION_TYPE_B, SECTION_TYPE_C, SECTION_TYPES, BACKGROUND_COLORS, DEFINED_CHILDREN };
