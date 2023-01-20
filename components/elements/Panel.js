import Image from "next/image";
import PropTypes from "prop-types";

function Panel({ children, id, className, reference, ...props }) {
  return (
    <>
      <div id={id} className={"container section" + (className ? ` ${className}` : '')} ref={reference} {...props}>
        {children}
      </div>
    </>
  );
}

function PanelDesc({ children, className, reference, ...props  }) {
  return (
    <>
      <div className={"section--desc" + (className ? ` ${className}` : '')} ref={reference} {...props}>{children}</div>
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




// Panel.defaultProps = {
//   reference: null,
// };

// PanelDesc.defaultProps = {
//   reference: null,
// };

// PanelImg.defaultProps = {
//   reference: null,
// };




export { Panel, PanelDesc, PanelImg };
