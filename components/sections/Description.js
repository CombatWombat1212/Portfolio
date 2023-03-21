import { getBackgroundClasses } from "./sections_utilities/GetClasses";
function getDescriptionClasses(type) {
  var descriptionClasses = "";
  if (type == "h1") descriptionClasses += " text--h1";
  if (type == "h2") descriptionClasses += " text--h2";
  if (type == "h3") descriptionClasses += " text--h3";
  if (type == "h4") descriptionClasses += " text--h4";
  return descriptionClasses;
}

function Description({ className, children, type, background, below }) {

  below = below ? true : false;

  var descriptionClasses = getDescriptionClasses(type);
  var backgroundClasses = getBackgroundClasses("section--description", background);

  return <div className={`section--description ${className ? className : ""} ${descriptionClasses} ${backgroundClasses ? backgroundClasses : ""}`}>{children}</div>;
}

export default Description;
