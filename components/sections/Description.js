import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { getBackgroundClasses } from "./sections_utilities/GetClasses";
import { getMirrorStyleProp } from "@/scripts/useMirrorStyle";
function getDescriptionClasses(type) {
  var descriptionClasses = "";
  if (type == "h1") descriptionClasses += " text--h1";
  if (type == "h2") descriptionClasses += " text--h2";
  if (type == "h3") descriptionClasses += " text--h3";
  if (type == "h4") descriptionClasses += " text--h4";
  return descriptionClasses;
}

function updateTextCol(className, desktop) {
  const hasTextCol = (() => {
    const regex = /text-col-\d/g;
    const matches = className.match(regex);
    const textColCount = (className.match(/text-col-/g) || []).length;

    return !!(matches && matches.length === 1 && textColCount === 1);
  })();

  if (hasTextCol && !desktop) {
    const regex = /text-col-(\d)/g;
    const matches = regex.exec(className);
    const textColCount = matches[1];
    const newTextColCount = Math.ceil(textColCount / 2);
    className = className.replace(regex, `text-col-${newTextColCount}`);
  }

  return className;
}

function Description({ className, children, type, background, below, ...props }) {
  below = below ? true : false;

  var descriptionClasses = getDescriptionClasses(type);
  var backgroundClasses = getBackgroundClasses("section--description", background);

  const { desktop } = useResponsive();

  className = className || "";
  className = updateTextCol(className, desktop);

  return (
    <div
      className={`section--description ${className} ${descriptionClasses} ${backgroundClasses ? backgroundClasses : ""}`}
      {...getMirrorStyleProp(props)}>
      {children}
    </div>
  );
}

export default Description;
