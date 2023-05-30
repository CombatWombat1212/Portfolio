import { getBackgroundClasses } from "./sections_utilities/GetClasses";

function Quote({ children, background, className }) {
  var backgroundClasses = getBackgroundClasses("section--quote", background);

  return (
    <div className={`section--quote quote ${backgroundClasses ? backgroundClasses : ""} ${className ? className : ""} `}>
      <p>{children}</p>
    </div>
  );
}

Quote.displayName = "Quote";
export default Quote;
