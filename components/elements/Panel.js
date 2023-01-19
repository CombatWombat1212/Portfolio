import Image from "next/image";
import PropTypes from "prop-types";

function Panel({ children, id, className }) {
  return (
    <>
      <div id={id} className={"container section" + (className ? ` ${className}` : '')}>
        {children}
      </div>
    </>
  );
}

function PanelDesc({ children, className }) {
  return (
    <>
      <div className={"section--desc" + (className ? ` ${className}` : '')}>{children}</div>
    </>
  );
}

function PanelImg({ children, className, effect }) {
  return (
    <>

      <div className={"section--graphic" + (className ? ` ${className}` : '')}>
        <div className="section--img">
          {/* {effect == 'gradient-white' && <div className="img--gradient img--gradient__white "></div>} */}
          {children}
          </div>
      </div>

    </>
  );
}



PanelImg.defaultProps = {
  effect: "none",
};

PanelImg.propTypes = {
  effect: PropTypes.oneOf(["none", "gradient-white"]),
};




export { Panel, PanelDesc, PanelImg };
