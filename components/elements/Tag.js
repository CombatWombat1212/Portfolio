import { defaultProps, PropTypes } from "prop-types";

// TODO: there should be a way to have a 'tool' variant vs the default 'category' varient, i.e. one thats round vs the default one

function Tag({ children, variant, filter, color, reference }) {

  var Elem = "div";

  var tagClasses = ["tag"];
  if (variant == "tool") {
    tagClasses.push("tag__tool");
  }
  if (filter) {
    tagClasses.push("tag__filter");
    Elem = "a";
  }
  if (color == "inverted") {
    tagClasses.push("tag__inverted");
  }

  tagClasses = tagClasses.join(" ");

  return (
    <>
      <Elem className={`${tagClasses} text-size-h4`} ref={reference ? reference : null}>{children}</Elem>
    </>
  );
}

Tag.defaultProps = {
  variant: "regular",
  color: "regular",
};

Tag.propTypes = {
  variant: PropTypes.oneOf(["regular", "tool"]),
  color: PropTypes.oneOf(["regular", "inverted"]),
};

export default Tag;
