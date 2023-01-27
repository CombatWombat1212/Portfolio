import Image from "next/image";
import { defaultProps, PropTypes } from "prop-types";
import React from "react";
import Mask from "../utilities/Mask";
import Background from "../utilities/Background";

const DEFINED_CHILDREN = ["Column", "Description", "Title", "Heading", "Graphic"];
const BACKGROUND_COLORS = ["background", "background darker", "primary", "secondary", "makeright tertiary"];

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

function ColumnGroup({ columns }) {
  return (
    <>
      {columns.map((column, i) => {
        var { graphic, heading, description, other } = column;
        return (
          <Column className={`col-${Math.floor(12 / columns.length)}`} key={`column ${i}`}>
            {graphic && <div className="section--graphic">{graphic}</div>}
            {heading && <>{heading}</>}
            {description && <>{description}</>}
            {other && <>{other}</>}
          </Column>
        );
      })}
    </>
  );
}

function Column({ children, className }) {
  return <div className={`section--column ${className ? className : ""}`}>{children}</div>;
}

function Graphic({ type, img }) {
  var isImg = type == "image";
  var isMask = type == "mask";

  // TODO: if you end up using this 'img-aspect-width' thing in multiple places then you should create a wrapper for Next/Image that automatically adds it to your image components, same as its done here and within the Mask component

  // TODO: for some reason section--graphic is only applied occasionally but you should fix this and make it so that its always wrapped in section--graphic right here
  return (
    <>
      {isImg && <Image src={img.src} alt={img.alt} width={img.width} height={img.height} style={{ "--img-aspect-width": img.width, "--img-aspect-height": img.height }} />}
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

function organizeChildren(allChildren) {
  var allTypes = [...DEFINED_CHILDREN, "Other"];

  var arr = [];

  for (var i = 0; i < allTypes.length; i++) {
    arr.push({ type: allTypes[i].toLocaleLowerCase(), elems: [] });
  }

  for (var i = 0; i < allTypes.length; i++) {
    var type = arr[i].type;
    if (type != "other") {
      arr[i].elems = allChildren.filter((child) => child.type.name == allTypes[i]) || null;
    } else {
      arr[i].elems = allChildren.filter((child) => DEFINED_CHILDREN.indexOf(child.type.name) == -1) || null;
    }
  }
  return arr;
}

function getSectionChildren(children) {
  var allChildren = children;

  var allTypes = [...DEFINED_CHILDREN, "Other"];

  // var columns = [],
  //   description = [],
  //   title = [],
  //   heading = [],
  //   graphic = [],
  //   other = [];

  var organizedChildren = [];

  organizedChildren = organizeChildren(allChildren);

  var [columns, description, title, heading, graphic, other] = [organizedChildren[0].elems, organizedChildren[1].elems, organizedChildren[2].elems, organizedChildren[3].elems, organizedChildren[4].elems, organizedChildren[5].elems];

  // console.log(organizedChildren)

  // var columns = organizedChildren.filter((child) => child.type == "column")[0];

  // var flattenedChildren = children;
  // var foundColumns = [];

  // while (flattenedChildren.filter((child) => child.type.name == "Column")   ){
  //   var column = flattenedChildren.filter((child) => child.type.name == "Column")[0];
  //   flattenedChildren = flattenedChildren.filter((child) => child.type.name != "Column");
  //   flattenedChildren = flattenedChildren.concat(column.props.children);
  // }

  // console.log(flattenedChildren)

  // for (var i=0; i< flattenedChildren.length; i++){
  //   if(flattenedChildren[i].type.name == "Column"){

  //     var column = flattenedChildren[i];
  //     column = organizeChildren(column.props.children);

  //     // allChildren.indexOf(flattenedChildren[i]) = column;

  //   }
  // }

  // for(var i =0; i< columns.elems.length ; i++){

  //   // console.log(columns.elems[i])
  //   columns.elems[i] = organizeChildren(columns.elems[i].props.children);

  // }

  // organizedChildren.filter((child) => child.type == "column")[0] = columns;

  //  console.log(organizedChildren)

  // var columns = organizedChildren.filter((child) => child.type == "column")[0];

  // var emergencyStop = 0;

  // while (columns.elems.length > 0 && emergencyStop < 20) {
  //   emergencyStop++;

  //   for (var i = 0; i < columns.elems.filter((child) => child.type == "column").length; i++) {
  //     var column = columns.elems.filter((child) => child.type == "column");
  //     // console.log(column)
  //     // columns.elems.filter((child) => child.type == "column")[0] = organizeChildren([column]);
  //     console.log(column)

  //   }

  //   if (emergencyStop == 20) {
  //     console.log("emergency stop");
  //   }
  // }

  // console.log(organizedChildren)

  if (columns.length != 0) {
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i];
      var columnChildren = column.props.children;
      var organizedColumnChildren = organizeChildren(columnChildren);

      var [columnColumns, columnDescription, columnTitle, columnHeading, columnGraphic, columnOther] = [organizedColumnChildren[0].elems, organizedColumnChildren[1].elems, organizedColumnChildren[2].elems, organizedColumnChildren[3].elems, organizedColumnChildren[4].elems, organizedColumnChildren[5].elems];

      columns[i] = { columns: columnColumns, description: columnDescription, title: columnTitle, heading: columnHeading, graphic: columnGraphic, other: columnOther };
    }
  }

  return { columns, description, title, heading, graphic, other };
}

function getMainClasses(pref, type) {
  if (pref == undefined) pref = `${pref}`;
  var mainClasses = `${pref}`;
  if (type == undefined) return mainClasses;
  if (type == "overview") mainClasses += ` ${pref}__overview`;
  if (type == "pitch") mainClasses += ` ${pref}__pitch`;

  return mainClasses;
}

function getGapClasses(type) {
  var gapClasses = ``;

  if (SECTION_TYPE_C.indexOf(type) != -1) gapClasses += " gap-4";

  return gapClasses;
}

function getContainerMarginClass(margin) {
  var containerMarginClass = "container";
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
    if (BACKGROUND_COLORS.indexOf(background) != -1) {
      if (pref == "chapter" && background != "background") wrapperClasses += ` ${pref}__color`;
      else if (pref == "section") wrapperClasses += ` ${pref}__color`;
    }

    if (background == "primary") wrapperClasses += ` ${pref}__primary`;
    if (background == "makeright tertiary") wrapperClasses += ` ${pref}__makeright-tertiary`;
    if (background == "background") wrapperClasses += ` ${pref}__background`;
    if (background == "background darker") wrapperClasses += ` ${pref}__background ${pref}__background-darker`;
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
  var { description, title, heading } = childs;
  if (description.length != 0 || title.length != 0 || heading.length != 0) hasText = true;
  return hasText;
}

function getHasGraphic(graphic) {
  var hasGraphic = false;
  hasGraphic = graphic.length != 0;
  return hasGraphic;
}

function checkErrorCases(type, columns, children) {
  if (type == "columns" && columns.length == 0) console.error('Section type "columns" requires at least one Column component as a child', children);
}

// TODO: at some point these should be re-ordered in a way that's more logical, maybe that would include more descriptive names but they're really hard to think of for something as abstract as this
// and background should really be renammed to something else because in this case it means a literal section describing background information, but everywhere else in this file it refers to the background color
const SECTION_TYPE_A = ["default", "overview", "logo banner"];
const SECTION_TYPE_B = ["pitch"];
const SECTION_TYPE_C = ["columns"];
const SECTION_TYPE_D = ["titled columns"];
const SECTION_TYPES = [...SECTION_TYPE_A, ...SECTION_TYPE_B, ...SECTION_TYPE_C, ...SECTION_TYPE_D];

function Section({ className, children, type, background, id, margin, titled }) {
  var pref = "section";

  // TODO: the 'columns' concept should work with all variants of section i think

  if (children == undefined) return null;
  if (children.length == undefined) children = [children];

  var childs = getSectionChildren(children);
  var { columns, description, title, heading, graphic, other } = childs;

  // console.log(columns);

  var mainClasses = getMainClasses(pref, type);
  var containerMarginClass = getContainerMarginClass(margin);
  var wrapperClasses = getWrapperClasses(pref, background);
  var gapClasses = getGapClasses(type);

  var hasText = getHasText(childs);
  var hasGraphic = getHasGraphic(graphic);

  var hasBackground = getHasBackground(background);

  var isTitled = titled != undefined ? titled : false;

  // checkErrorCases(type, columns, children);

  return (
    <>
      <div id={id} className={wrapperClasses}>
        {hasBackground && typeof background == "object" && (
          <>
            <Background img={background} />
          </>
        )}
        <div className="section--inner">
          <div className={`${mainClasses} ${containerMarginClass} ${className} ${isTitled ? '' : gapClasses}`}>
            {SECTION_TYPE_A.indexOf(type) != -1 ? (
              <>
                {hasText && (
                  <div className="section--copy">
                    {title && <>{title}</>}
                    {heading && <>{heading}</>}
                    {description && <>{description}</>}
                    {other && <>{other}</>}
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
                <div className="section--copy col-3">
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
                {isTitled && (
                  <div className="section--copy col-12">
                    {title && <>{title}</>}
                    {heading && <>{heading}</>}
                    {description && <>{description}</>}
                  </div>
                )}
                {isTitled ? (
                  <div className={`${gapClasses} flex-row section--col-group`}>
                    <ColumnGroup columns={columns} />
                  </div>
                ) : (
                  <ColumnGroup columns={columns} />
                )}
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
};

Section.propTypes = {
  margin: PropTypes.oneOf(["regular", "wide"]),
  type: PropTypes.oneOf(SECTION_TYPES),
  background: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf(["none", ...BACKGROUND_COLORS])]),
};

// TODO: section and chapter background should be able to be set with an image, and named colors - only thing missing from that now is image background support for chapters but i don't even think that's used in the design

function Chapter({ children, type, background, id, margin }) {
  var pref = "chapter";

  var wrapperClasses = getWrapperClasses(pref, background);
  var mainClasses = getMainClasses(pref, type);

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
