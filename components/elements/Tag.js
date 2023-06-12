import { ClassList } from "@/scripts/GlobalUtilities";
import { defaultProps, PropTypes } from "prop-types";

// TODO: there should be a way to have a 'tool' variant vs the default 'category' varient, i.e. one thats round vs the default one

function Tag({ children, variant, filter, color, reference, className }) {
  var Elem = "div";

  const list = new ClassList("tag");
  list.addIf("tool", variant == "tool");
  list.addIf("filter", filter);
  list.addIf("inverted", color == "inverted");
  list.addIf(className, className, {pref:false});
  const classes = list.get();

  if (filter) {
    Elem = "a";
  }

  return (
    <>
      <Elem className={`${classes} text-size-h4`} ref={reference ? reference : null}>
        {children}
      </Elem>
    </>
  );
}

Tag.displayName = "Tag";

Tag.defaultProps = {
  variant: "regular",
  color: "regular",
};

Tag.propTypes = {
  variant: PropTypes.oneOf(["regular", "tool"]),
  color: PropTypes.oneOf(["regular", "inverted"]),
};

export default Tag;
