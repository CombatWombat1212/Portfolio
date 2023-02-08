import Image from "next/image";
import { defaultProps, PropTypes } from "prop-types";
import React from "react";
import Mask from "../utilities/Mask";
import Background from "../utilities/Background";
import ICONS from "@/data/ICONS";

const DEFINED_CHILDREN = ["Column", "Description", "Title", "Heading", "Graphic", "Quote"];
const BACKGROUND_COLORS = ["background", "background darker", "background darkest", "primary", "secondary", "makeright tertiary"];

function getHeadingClasses(type) {
  var headingClasses = "";
  if (type == "h1") headingClasses += " text--h1";
  if (type == "h2") headingClasses += " text--h2";
  if (type == "h3") headingClasses += " text--h3";
  if (type == "h4") headingClasses += " text--h4";
  return headingClasses;
}

function getMainClasses(pref, type) {
  if (pref == undefined) pref = `${pref}`;
  var mainClasses = `${pref}`;
  if (type == undefined) return mainClasses;
  if (type == "overview") mainClasses += ` ${pref}__overview`;
  if (type == "pitch") mainClasses += ` ${pref}__pitch`;

  return mainClasses;
}

function getGapClasses(type, arrows) {
  var gapClasses = "";
  if (SECTION_TYPE_C.indexOf(type) != -1) gapClasses += " gap-4";
  if (arrows) {
    gapClasses = "gap-5";
  }
  return gapClasses;
}

function getContainerMarginClass(margin) {
  var containerMarginClass = "container";
  if (margin == undefined) return containerMarginClass;
  // if (margin == "regular") containerMarginClass += " container__regular";
  if (margin == "wide") containerMarginClass += " container__wide";

  return containerMarginClass;
}

function getWrapperClasses(pref) {
  if (pref == undefined) pref = "section";
  var wrapperClasses = `${pref}--wrapper`;

  return wrapperClasses;
}

function getBackgroundClasses(pref, background) {
  var backgroundClasses = ``;
  if (background == undefined) return backgroundClasses;

  if (typeof background == "string") {
    if (BACKGROUND_COLORS.indexOf(background) != -1) {
      if (pref == "chapter" && background != "background") backgroundClasses += ` ${pref}__color`;
      else if (pref == "section") backgroundClasses += ` ${pref}__color`;
      else if (pref == "section--quote") backgroundClasses += ` ${pref}__color`;
      else if (pref == "section--description") backgroundClasses += ` ${pref}__color`;
    }

    if (pref == "section--graphic") backgroundClasses += ` graphic--panel`;

    if (background == "primary") backgroundClasses += ` background__primary`;
    if (background == "makeright tertiary") backgroundClasses += ` background__makeright-tertiary`;
    if (background == "background") backgroundClasses += ` background__background`;
    if (background == "background darker") backgroundClasses += ` background__background background__background-darker`;
    if (background == "background darkest") backgroundClasses += ` background__background background__background-darkest`;
  } else if (typeof background == "object") {
    backgroundClasses += ` ${pref}__image`;
  }
  return backgroundClasses;
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

function getColClassList(classList) {
  var classes = [];
  var columnClasses = [];
  var otherClasses = [];

  if (classList == undefined || classList == "") return { colClasses: columnClasses, otherClasses: otherClasses };
  if (typeof classList == "string") classes = classList.split(" ");

  for (var i = 0; i < classes.length; i++) {
    if (classes[i].indexOf("col-") != -1) columnClasses.push(classes[i]);
    else otherClasses.push(classes[i]);
  }

  return { colClasses: columnClasses, otherClasses: otherClasses };
}

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

function Quote({ children, background, className }) {
  var backgroundClasses = getBackgroundClasses("section--quote", background);

  return (
    <div className={`section--quote quote ${backgroundClasses ? backgroundClasses : ""} ${className ? className : ""} `}>
      <p>{children}</p>
    </div>
  );
}

function Heading({ children, type, className }) {
  var headingClasses = getHeadingClasses(type);

  return (
    <div className={`section--heading ${headingClasses} ${className ? className : ''}`}>
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

function Description({ className, children, type, background }) {
  var descriptionClasses = getHeadingClasses(type);

  var backgroundClasses = getBackgroundClasses("section--description", background);

  return <div className={`section--description ${className ? className : ""} ${descriptionClasses} ${backgroundClasses ? backgroundClasses : ""}`}>{children}</div>;
}

function ColumnGroup({ columns, arrows }) {
  return (
    <>
      {columns.map((column, i) => {
        var { graphic, heading, title, description, quote, other, classes } = columns[i];

        var colClasses = `col-${Math.floor(12 / columns.length)}`;
        var otherClasses = "";
        if (classes.colClasses.length != 0) colClasses = classes.colClasses.join(" ");
        if (classes.otherClasses.length != 0) otherClasses = classes.otherClasses.join(" ");

        return (
          <Column className={`column ${colClasses} ${otherClasses}`} key={`column ${i}`}>
            {arrows && i != 0 && (
              <div className="column--arrow">
                <Graphic type="mask" img={ICONS["chevron_right"]}></Graphic>
              </div>
            )}
            {title && <>{title}</>}
            {graphic && <>{graphic}</>}
            {heading && <>{heading}</>}
            {description && <>{description}</>}
            {quote && <>{quote}</>}
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







function Graphic({ className, type, img, background, children }) {
  var pref = "section--graphic";
  var isImg = type == "image";
  var isMask = type == "mask";
  var hasBackground = getHasBackground(background);
  var backgroundClasses = getBackgroundClasses(pref, background);

  var hasButton = false;
  if (children) {
    var childrenArray = React.Children.toArray(children);
    for (var i = 0; i < childrenArray.length; i++) {
      if (childrenArray[i].type.name == "Button") {
        hasButton = true;
        break;
      }
    }
  }

  // TODO: if you end up using this 'img-aspect-width' thing in multiple places then you should create a wrapper for Next/Image that automatically adds it to your image components, same as its done here and within the Mask component

  return (
    <>
      {isImg && (
        <div className={`section--graphic graphic ${backgroundClasses} ${className ? className : ''} ${hasButton ? 'graphic__container' : ''}`} style={{ "--img-aspect-width": img.width, "--img-aspect-height": img.height }}>
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} />
          {children && children}
        </div>
      )}
      {isMask && (
        <div className={`section--graphic graphic ${backgroundClasses} ${className ? className : ''} ${hasButton ? 'graphic__container' : ''}`} style={{ "--mask-aspect-width": img.width, "--mask-aspect-height": img.height }}>
          <Mask src={img.src} alt={img.alt} width={img.width} height={img.height} />
          {children && children}
        </div>
      )}
    </>
  );
}

Graphic.defaultProps = {
  type: "image",
};

Graphic.propTypes = {
  type: PropTypes.oneOf(["image", "mask"]),
};

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

  var childs = getSectionChildren(children);
  var { columns, description, title, heading, graphic, other } = childs;

  var mainClasses = getMainClasses(pref, type);
  var containerMarginClass = getContainerMarginClass(margin);
  var wrapperClasses = getWrapperClasses(pref);
  var backgroundClasses = getBackgroundClasses(pref, background);
  var gapClasses = getGapClasses(type, arrows);

  var hasText = getHasText(childs);
  var hasGraphic = getHasGraphic(graphic);

  var hasBackground = getHasBackground(background);

  var hasArrows = arrows || false;
  var isTitled = titled || false;

  return (
    <>
      <div id={id} className={wrapperClasses + backgroundClasses}>
        {hasBackground && typeof background == "object" && (
          <>
            <Background img={background} />
          </>
        )}
        <div className="section--inner">
          <div className={`${mainClasses} ${containerMarginClass} ${className ? className : ''} ${isTitled ? "" : gapClasses}`}>
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
                  <div className={`section--main ${gapClasses} ${mainClassName ? mainClassName : ''}`}>
                    <ColumnGroup columns={columns} arrows={hasArrows} />
                  </div>
                ) : (
                  <ColumnGroup columns={columns} arrows={hasArrows} />
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

  var wrapperClasses = getWrapperClasses(pref);
  var backgroundClasses = getBackgroundClasses(pref, background);
  var mainClasses = getMainClasses(pref, type);

  return (
    <div id={id} className={wrapperClasses + backgroundClasses}>
      <div className={mainClasses}>{children}</div>
    </div>
  );
}

Chapter.defaultProps = Section.defaultProps;
Chapter.propTypes = Section.propTypes;

export default Section;
export { Section, Chapter, Description, Column, Title, Heading, Graphic, Quote };
