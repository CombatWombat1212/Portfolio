// TODO: Do i want all popups to load when the page loads so they can open quickly? or do I want to save on the page load and only load the popup when it is needed? for right now i'm going to be loading it in on click

import React, { useState } from "react";


function popupHandler(props) {
    var type;
    var img;
    
    if (typeof props == "object" && typeof props.src != "undefined") {
        img = props;
        type = "img";
    }
    
}    


function Popup({popup, setPopup}) {

    var type;
    var img;
    
    if (typeof popup == "object" && typeof popup.src != "undefined") {
        img = popup;
        type = "img";
    }else{
    // 
    }


  return (
    <>
      {popup && (
        <div className="popup--wrapper">
          <div className="popup">Enter</div>
        </div>
     )}
    </>
  );
}

export default Popup;
export { Popup, popupHandler };
