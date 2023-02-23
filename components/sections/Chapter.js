import Section, { SECTION_DEFAULT_PROPS, SECTION_PROP_TYPES } from "./Sections";
import { getWrapperClasses, getBackgroundClasses, getElemClasses } from "./sections_utilities/GetClasses";

// TODO: section and chapter background should be able to be set with an image, and named colors - only thing missing from that now is image background support for chapters but i don't even think that's used in the design

function Chapter({ children, type, wrapperClassName, background, id, name, margin }) {
  var pref = "chapter";

  var wrapperClasses = getWrapperClasses(wrapperClassName, pref);
  var backgroundClasses = getBackgroundClasses(pref, background);
  var elemClasses = getElemClasses(pref, type);

  return (
    <div id={id} className={wrapperClasses + backgroundClasses} name={name ? name : ''}>
      <div className={elemClasses}>{children}</div>
    </div>
  );
}

Chapter.defaultProps = SECTION_DEFAULT_PROPS;
Chapter.propTypes = SECTION_PROP_TYPES;

export default Chapter;
