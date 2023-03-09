import { clamp, splitPx } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useRef } from "react";
import { Graphic } from "../sections/Sections";



// TODO: finish it, obviously but also the event listener on mouse up is compounding and not being removed 

function splitSetPosition(split) {
  split.elem.style.setProperty("--split-progress", `${split.progress * 100}%`);
}

function splitGetScale(split) {
  var division = split.elem.querySelector(".split--division");
  split.width = division.offsetWidth;
  split.line.width = split.line.elem.offsetWidth;
}

function splitInit(split) {
  split = {
    elem: split,
    width: 0,
    progress: 0.5,
    line: {
      elem: split.querySelector(".split--line"),
      width: 0,
    },
  };

  splitGetScale(split);
  splitSetPosition(split);
}

function Split({ before, after }) {
  var reference = useRef(null);

  useMountEffect(() => {
    var split = reference.current;
    splitInit(split);
  });

  return (
    <div className="split" ref={reference}>
      <div className="split--viewer split--before">
        <Graphic type="image" className="split--graphic" img={before} />
      </div>
      <div className="split--viewer split--after">
        <Graphic type="image" className="split--graphic" img={after} />
      </div>
      <div className="split--division" onTouchStart={splitMouseDown} onMouseDown={splitMouseDown} onMouseMove={splitMouseMoveStart} onTouchMove={splitMouseMoveStart}>
        <div className="split--line">
          <div className="split--handle">
            <div className="split--inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

var splitMouse = {
  start: { x: 0, y: 0 },
  cur: { x: 0, y: 0 },
};

var splitHandle = {
  start: { x: 0, y: 0 },
  cur: { x: 0, y: 0 },
};

var splitMouseGrabbed = 0;




function splitMouseMoveStart(e) {
    var handle = e.target;
    var slider = handle.parentElement;
  
    var mouse = { x: 0, y: 0 };
  
    if (e.type == "mousemove" && splitMouseGrabbed == 1) {
      splitMouseGrabbed++;
      mouse.x = e.clientX;
      splitMouse.start.x = mouse.x;
      splitHandle.start.x = splitPx(window.getComputedStyle(handle).getPropertyValue("--slider-handle-left"));
    } else if (e.type == "touchmove" && splitMouseGrabbed == 1) {
      splitMouseGrabbed++;
      var touch = e.touches[0];
      mouse.x = touch.clientX;
      splitMouse.start.x = mouse.x;
      sliderHandle.start.x = splitPx(window.getComputedStyle(handle).getPropertyValue("--slider-handle-left"));
    }
  }
  



function splitMouseDown(e) {
  splitMouseGrabbed++;
  console.log('down');

  var handle = e.target.closest(".split--division");
  handle.classList.add("split--division__active");

  const mouseMoveHandler = (e) => {
    splitMouseMove(e, handle);
  };
  const mouseUpHandler = (e) => {
    splitMouseUp(e, handle);
  };

  
  if (e.type == "mousedown") {
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  } else if (e.type == "touchstart") {
    document.addEventListener("touchmove", mouseMoveHandler);
    document.addEventListener("touchend", mouseUpHandler);
  }
}

function splitMouseUp(e, handle) {
  splitMouseGrabbed = 0;
  console.log('up');

  handle.classList.remove("slider--handle__active");
  document.body.classList.remove("grabbed");

  const mouseMoveHandler = (e) => {
    splitMouseMove(e, handle);
  };
  const mouseUpHandler = (e) => {
    splitMouseUp(e, handle);
  };

  if (e.type == "mousedown") {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  } else if (e.type == "touchstart") {
    document.removeEventListener("touchmove", mouseMoveHandler);
    document.removeEventListener("touchend", mouseUpHandler);
  }
}

function splitMouseMove(e, handle) {
  if (splitMouseGrabbed < 2) return;

  var bar = handle.parentElement;
  var slider = bar.parentElement;

  var isTouchMove = e.type == "touchmove";
  var touchOrMouse = isTouchMove ? e.touches[0] : e;

  var mouse = { x: 0, y: 0 };
  mouse.x = touchOrMouse.clientX;

  splitMouse.cur.x = mouse.x;

  var handlePos = splitMouse.start.x + (splitMouse.cur.x - splitMouse.start.x);


  // handle.style.setProperty("--slider-handle-left", `${handlePos}px`);
}

export default Split;
