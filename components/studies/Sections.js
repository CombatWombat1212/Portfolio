import {defaultProps, PropTypes} from "prop-types";



function Section({ children, margin }) {
  var description = children.filter((child) => child.type.name == "Description");
  var title = children.filter((child) => child.type.name == "Title");
  var heading = children.filter((child) => child.type.name == "Heading");
  var graphic = children.filter((child) => child.type.name == "Graphic");

  var containerType = "";
  if (margin == "regular") containerType = "container";
  if (margin == "wide") containerType = "container container__wide";

  return (
    <div className={"section" + ` ${containerType}`}>
      <div>
        {title}
      </div>
    </div>
  );
}

Section.defaultProps = {
  // type: "home",
  margin: "regular",
};

Section.propTypes = {
  // effect: PropTypes.oneOf(["none", "gradient-white"]),
  margin: PropTypes.oneOf(["regular", "wide"]),
};

function Heading({ children }) {
  return (
    <div className="section--heading">
      <h2>{children}</h2>
    </div>
  );
}

function Title({ children }) {
  return (
    <div className="section--title">
      <h4>{children}</h4>
    </div>
  );
}

function Description({ children }) {
  return <div className="section--description">{children}</div>;
}

function Graphic({ children }) {
  return <div className="section--graphic">{children}</div>;
}

export default Section;
export { Section, Description, Title, Heading, Graphic };
