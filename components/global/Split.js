import { clamp, RESIZE_TIMEOUT } from "@/scripts/GlobalUtilities";
import { useEffect, useRef, useState } from "react";
import { Graphic } from "../sections/Sections";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";

function splitSetProgress(split) {
  split.elem.style.setProperty("--split-width", `${split.width}px`);
  split.elem.style.setProperty("--split-before-width", `${split.width * split.progress}px`);
  split.elem.style.setProperty("--split-after-width", `${split.width * (1 - split.progress)}px`);
  split.elem.style.setProperty("--split-progress", `${split.progress * 100}%`);
}

function splitGetProgress(e, split) {
  var isTouchMove = e.type == "touchmove";
  var isTouchStart = e.type == "touchstart";
  var touchOrMouse = isTouchMove || isTouchStart ? e.touches[0] : e;
  var mouse = { x: 0, y: 0 };
  mouse.x = touchOrMouse.clientX;
  split.pos.mouse.current.x = mouse.x - split.left - split.line.width / 2;
  var domainWidth = split.width;
  var handleWidth = split.line.width;

  var handlePos = split.pos.mouse.current.x;

  var min = 0;
  var max = domainWidth - handleWidth;

  if (handlePos < min) handlePos = min;
  if (handlePos > max) handlePos = max;

  var progress = clamp(handlePos / domainWidth, 0, 1);
  split.progress = progress;
}

function splitGetScale(split) {
  split.width = split.division.offsetWidth;
  split.line.width = split.line.elem.offsetWidth;
  split.left = split.division.getBoundingClientRect().left;
  // throw new Error(stringifyObject(split));
}

function Split({ before, after, square }) {
  const [mounted, setMounted] = useState(false);
  var isSquare = square ? true : false;

  const splitRef = useRef(null);
  const divisionRef = useRef(null);
  const lineRef = useRef(null);

  const split = {
    elem: splitRef.current,
    width: 0,
    left: 0,
    progress: 0.5,
    division: divisionRef.current,
    grabbed: 0,
    line: {
      elem: lineRef.current,
      width: 0,
    },
    pos: {
      mouse: {
        start: { x: 0, y: 0 },
        current: { x: 0, y: 0 },
      },
    },
    isResizing: null,
  };

  useEffect(() => {
    if (!split.elem || !split.line.elem || !split.division) return;
    setMounted(true);
  }, [split.elem, split.line.elem, split.division]);

  useEffect(() => {
    if (!mounted) return;
    splitInit();

    split.resizeObserver = new ResizeObserver(refreshed);
    split.resizeObserver.observe(split.elem);

    return () => {
      split.resizeObserver.disconnect();
    };
  }, [mounted]);

  function splitInit() {
    init();

    function reset() {
      splitGetScale(split);
      split.progress = 0.5;
      splitSetProgress(split);
    }

    function init() {
      refresh();
      split.elem.addEventListener("mousedown", splitMouseDown);
      split.elem.addEventListener("touchstart", splitMouseDown);
      split.elem.addEventListener("mousemove", splitMouseMoveStart);
      split.elem.addEventListener("touchmove", splitMouseMoveStart);

      splitResetObserver(split);
    }

    function splitMouseMoveStart(e) {
      var mouse = { x: 0, y: 0 };
      if (e.type == "mousemove" && split.grabbed == 1) {
        split.grabbed++;
        mouse.x = e.clientX;
        split.pos.mouse.start.x = mouse.x;
      } else if (e.type == "touchmove" && split.grabbed == 1) {
        split.grabbed++;
        var touch = e.touches[0];
        mouse.x = touch.clientX;
        split.pos.mouse.start.x = mouse.x;
      }
    }

    function splitMouseMove(e) {
      if (split.grabbed < 2) return;
      splitGetProgress(e, split);
      splitSetProgress(split);
    }

    function splitMouseDown(e) {
      split.grabbed++;

      splitGetProgress(e, split);
      splitSetProgress(split);

      if (e.type == "mousedown") {
        document.addEventListener("mousemove", splitMouseMove);
        document.addEventListener("mouseup", splitMouseUp);
        document.body.classList.add("cursor-ew-resize");
        split.elem.classList.add("hover");
      } else if (e.type == "touchstart") {
        document.body.classList.add("noscroll");
        document.addEventListener("touchmove", splitMouseMove);
        document.addEventListener("touchend", splitMouseUp);
      }
    }

    function splitMouseUp(e) {
      document.body.classList.remove("noscroll");

      split.grabbed = 0;
      document.removeEventListener("mousemove", splitMouseMove);
      document.removeEventListener("mouseup", splitMouseUp);
      document.removeEventListener("touchmove", splitMouseMove);
      document.removeEventListener("touchend", splitMouseUp);
      document.body.classList.remove("cursor-ew-resize");
      split.elem.classList.remove("hover");
    }

    function splitResetObserver(split) {
      var observer = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              reset();
            }
          });
        },
        { threshold: 0 }
      );
      observer.observe(split.elem);
    }
  }

  const { loading, bp } = useResponsive();

  useEffect(() => {
    if (!mounted) return;
    refresh();
  }, [loading, bp]);

  function refresh() {
    splitGetScale(split);
    splitSetProgress(split);
  }

  function refreshed() {
    if (!window) return;
    if (!mounted) return;
    window.clearTimeout(split.isResizing);
    split.isResizing = setTimeout(function () {
      refresh();
    }, RESIZE_TIMEOUT);
  }


  return (
    <div className={`split ${isSquare && "split__square"}`} ref={splitRef}>
      <div className="split--viewer split--before">
        <Graphic type="image" className="split--graphic" img={before} />
        <div className="split--label split--label__before">
          <span>Before</span>
        </div>
      </div>
      <div className="split--viewer split--after">
        <Graphic type="image" className="split--graphic" img={after} />
        <div className="split--label split--label__after">
          <span>After</span>
        </div>
      </div>
      <div className="split--division" ref={divisionRef}>
        <div className="split--line" ref={lineRef}>
          <div className="split--handle">
            <div className="split--inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Split;
