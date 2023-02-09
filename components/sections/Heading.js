import { defaultProps, PropTypes } from "prop-types";


function getHeadingClasses(type) {
    var headingClasses = "";
    if (type == "h1") headingClasses += " text--h1";
    if (type == "h2") headingClasses += " text--h2";
    if (type == "h3") headingClasses += " text--h3";
    if (type == "h4") headingClasses += " text--h4";
    return headingClasses;
  }
  

function Heading({ children, type, className }) {
  var headingClasses = getHeadingClasses(type);

  return (
    <div className={`section--heading ${headingClasses} ${className ? className : ""}`}>
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

export default Heading;
