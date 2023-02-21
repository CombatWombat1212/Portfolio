import { defaultProps, PropTypes } from "prop-types";

// TODO: there should be a way to have a 'tool' variant vs the default 'category' varient, i.e. one thats round vs the default one

function Tag({ children, variant }) {

  var tagClasses = "tag";
  if(variant =="tool"){
    tagClasses = "tag tag__tool"
  }

  return (
    <>
      <div className={`${tagClasses} text-size-h4`}>{children}</div>
    </>
  );
}

Tag.defaultProps = {
  variant: "regular",
};

Tag.propTypes = {
  variant: PropTypes.oneOf(["regular", "tool"]),
};

export default Tag;
