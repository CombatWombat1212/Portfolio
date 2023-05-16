const { addAttrNonDestructive } = require("@/scripts/GlobalUtilities");
const { useMountEffect } = require("@/scripts/hooks/useMountEffect");
const { useRef } = require("react");

function Toggle({ state, set, children}) {
    var toggle = useRef(null);
  
    useMountEffect(() => {
      addAttrNonDestructive(toggle.current, "onclick", "setTimeout(()=>{this.blur();},200)", ";");
    });
  
    const toggleState = () => {
      set(!state);
    };
  
    return (
      <div className="toggle">
        <label className="toggle--switch">
          <input
            className="toggle--checkbox"
            type="checkbox"
            ref={toggle}
            onClick={toggleState}
            checked={state}
            onChange={() => {
              set(!state);
            }}
          />
          <span className="toggle--slider"></span>
        </label>
        <div className="toggle--label">
          <span>{children}</span>
        </div>
      </div>
    );
  }
  

  export {Toggle};