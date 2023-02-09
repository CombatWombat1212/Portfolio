import { defaultProps, PropTypes } from "prop-types";
import React from "react";
import Background from "../utilities/Background";
import ICONS from "@/data/ICONS";

import {getElemClasses, getContainerMarginClass, getWrapperClasses, getMainClasses, getGapClasses, getBackgroundClasses, getColClassList} from "./sections_utilities/GetClasses";
import { getHasText, getHasGraphic, getHasBackground } from "./sections_utilities/IfHas";

import Graphic from "./Graphic";
import Quote from "./Quote";
import Heading from "./Heading";
import Title from "./Title";
import Description from "./Description";
import {Column, ColumnGroup} from "./Columns";


const DEFINED_CHILDREN = ["Column", "Description", "Title", "Heading", "Graphic", "Quote"];
const BACKGROUND_COLORS = ["background", "background darker", "background darkest", "primary", "secondary", "tertiary", "tertiary light", "makeright tertiary"];




function organizeChildren(allChildren) {
  var allTypes = [...DEFINED_CHILDREN, "Other"];

  var arr = [];

  if (allChildren.length == undefined) allChildren = [allChildren];

  for (var i = 0; i < allTypes.length; i++) {
    arr.push({ type: allTypes[i].toLocaleLowerCase(), elems: [] });
  }

  for (var i = 0; i < allTypes.length; i++) {
    var type = arr[i].type;

    if (type != "other") {
      arr[i].elems = allChildren.filter((child) => child.type.name == allTypes[i]);
    } else {
      arr[i].elems = allChildren.filter((child) => DEFINED_CHILDREN.indexOf(child.type.name) == -1) || null;
    }
  }
  return arr;
}

function getSectionChildren(children) {
  var allChildren = children;

  var allTypes = [...DEFINED_CHILDREN, "Other"];

  var organizedChildren = [];

  organizedChildren = organizeChildren(allChildren);

  var [columns, description, title, heading, graphic, quote, other] = [organizedChildren[0].elems, organizedChildren[1].elems, organizedChildren[2].elems, organizedChildren[3].elems, organizedChildren[4].elems, organizedChildren[5].elems, organizedChildren[6].elems];

  if (columns.length != 0) {
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i];

      var columnClasses = getColClassList(column.props.className);

      var columnChildren = column.props.children;
      var organizedColumnChildren = organizeChildren(columnChildren);

      var [columnColumns, columnDescription, columnTitle, columnHeading, columnGraphic, columnQuote, columnOther] = [organizedColumnChildren[0].elems, organizedColumnChildren[1].elems, organizedColumnChildren[2].elems, organizedColumnChildren[3].elems, organizedColumnChildren[4].elems, organizedColumnChildren[5].elems, organizedColumnChildren[6].elems];

      columns[i] = { columns: columnColumns, description: columnDescription, title: columnTitle, heading: columnHeading, graphic: columnGraphic, quote: columnQuote, other: columnOther, classes: columnClasses };
    }
  }

  return { columns, description, title, heading, graphic, quote, other };
}





// TODO: at some point these should be re-ordered in a way that's more logical, maybe that would include more descriptive names but they're really hard to think of for something as abstract as this
// and background should really be renammed to something else because in this case it means a literal section describing background information, but everywhere else in this file it refers to the background color
const SECTION_TYPE_A = ["default", "overview", "logo banner"];
const SECTION_TYPE_B = ["pitch"];
const SECTION_TYPE_C = ["columns"];
const SECTION_TYPES = [...SECTION_TYPE_A, ...SECTION_TYPE_B, ...SECTION_TYPE_C];

function Section({ className, children, type, background, id, margin, titled, arrows, mainClassName }) {
  var pref = "section";

  // TODO: the 'columns' concept should work with all variants of section i think

  if (children == undefined) return null;
  if (children.length == undefined) children = [children];
  
  titled = titled || false;
  var isTitled = titled ? true : false;

  var childs = getSectionChildren(children);
  var { columns, description, title, heading, graphic, other } = childs;

  var elemClasses = getElemClasses(pref, type);
  var containerMarginClass = getContainerMarginClass(margin);
  var wrapperClasses = getWrapperClasses(pref);
  var backgroundClasses = getBackgroundClasses(pref, background);
  var gapClasses = getGapClasses(type, arrows);

  var mainClasses = getMainClasses(mainClassName, titled);

  var hasText = getHasText(childs);
  var hasGraphic = getHasGraphic(graphic);
  var hasBackground = getHasBackground(background);
  var hasArrows = arrows || false;



  return (
    <>
      <div id={id} className={wrapperClasses + backgroundClasses}>
        {hasBackground && typeof background == "object" && (
          <>
            <Background img={background} />
          </>
        )}
        <div className="section--inner">
          <div className={`${elemClasses} ${containerMarginClass} ${className ? className : ''} ${isTitled ? "" : gapClasses}`}>
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
                    <ColumnGroup columns={columns} arrows={hasArrows} />
                  </div>
                ) : (
                  <ColumnGroup columns={columns} arrows={hasArrows} />
                )}
              </>
            ) : SECTION_TYPE_D.indexOf(type) != -1 ? (
              <>
              
              
              
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
  type: "default",
  className: "",
};

Section.propTypes = {
  margin: PropTypes.oneOf(["regular", "wide"]),
  type: PropTypes.oneOf(SECTION_TYPES),
  background: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf(["none", ...BACKGROUND_COLORS])]),
};

// TODO: section and chapter background should be able to be set with an image, and named colors - only thing missing from that now is image background support for chapters but i don't even think that's used in the design

function Chapter({ children, type, background, id, margin }) {
  var pref = "chapter";

  var wrapperClasses = getWrapperClasses(pref);
  var backgroundClasses = getBackgroundClasses(pref, background);
  var elemClasses = getElemClasses(pref, type);

  return (
    <div id={id} className={wrapperClasses + backgroundClasses}>
      <div className={elemClasses}>{children}</div>
    </div>
  );
}

Chapter.defaultProps = Section.defaultProps;
Chapter.propTypes = Section.propTypes;

export default Section;
export { Section, Chapter, Description, Column, Title, Heading, Graphic, Quote};
export {SECTION_TYPE_A, SECTION_TYPE_B, SECTION_TYPE_C, SECTION_TYPES, BACKGROUND_COLORS};
