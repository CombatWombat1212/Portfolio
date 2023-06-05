import { clamp, map, RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import { useEffect, useRef, useState } from "react";
import { addClassToJsxObj, addStyleToJsxObj } from "../sections/sections_utilities/ClassUtilities";

function ImageRow({ children, className, col, direction, scrollType="scroll" }) {
  const [mounted, setMounted] = useState(false);
  const [currentCol, setCurrentCol] = useState(col);

  const reference = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, [reference]);

  useEffect(() => {
    if (!mounted) return;
    var row = reference.current;
    rowInit(row, scrollType);
  }, [mounted]);

  useEffect(() => {
    setCurrentCol(col);
  }, [col]);

  var childs = children.map((child, index) => {
    var el = addClassToJsxObj(child, "image-row--image");
    el = addStyleToJsxObj(el, "--image-row-index", index);
    return el;
  });

  var dir = {
    key: direction,
    value: direction == "right" ? 1 : 0,
  };

  return (
    <div
      className={`image-row ${className || ""}`}
      style={{
        "--image-row-col": currentCol,
        "--image-row-direction": dir.value,
      }}
      ref={reference}>
      <div className="image-row--wrapper">{childs}</div>
    </div>
  );
}

ImageRow.defaultProps = {
  direction: "right",
};
ImageRow.displayName = "ImageRow";

function rowGetImages(row) {
  var images = Array.from(row.elem.querySelectorAll(".image-row--image"));
  row.images.elems = images;
}

function rowGetImageSize(row) {
  row.images.width = splitPx(getComputedStyle(row.images.elems[0]).getPropertyValue("width"));
  const tempHeight = splitPx(getComputedStyle(row.images.elems[0]).getPropertyValue("height"));

  if (tempHeight > 0 && tempHeight < 10000) {
    row.images.height = tempHeight;
  }
}

function rowSetHeight(row) {
  row.elem.style.setProperty("--image-height", `${row.images.height}px`);
}

function rowGetDistance(row) {
  row.distance = window.innerHeight;
}

function rowSetLeft(row) {
  row.elem.style.setProperty("--image-row-progress", `${row.progress}`);
}

function rowGetProgress(row) {
  // Get the bounding rect of the row
  const rect = row.elem.getBoundingClientRect();
  // Calculate the middle point of the row
  const rowMidPoint = rect.top + rect.height / 2;
  // Calculate the middle point of the viewport
  const viewportMidPoint = window.innerHeight / 2;
  // Calculate the distance between the middle points
  const distance = viewportMidPoint - rowMidPoint;
  // Calculate the progress as a value between 0 and 1
  // 0 means that the top of the row is underneath the viewport
  // 1 means that the bottom of the row is above the viewport
  const maxDistance = window.innerHeight / 2 + rect.height / 2;
  var progress = Math.min(distance / maxDistance, 1);

  progress = clamp(progress, -1, 1);
  progress = map(progress, -1, 1, 0, 1);

  row.progress = progress;
}

function rowInit(elem, scollType) {

  var row = {
    type: scollType,
    elem: elem,
    observer: null,
    distance: 0,
    progress: 0,
    images: {
      width: 0,
      height: 0,
      elems: [],
    },
  };

  run();

  if (row.observer) {
    row.observer.disconnect();
    row.observer = null;
  }

  row.observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", rowOnScroll);
        } else {
          window.removeEventListener("scroll", rowOnScroll);
        }
      });
    },
    {
      threshold: 0,
    }
  );

  row.observer.observe(row.elem);

  function rowOnScroll() {
    rowGetDistance(row);
    rowGetProgress(row);
    rowSetLeft(row);
  }

  function run() {
    rowGetImages(row);
    rowGetImageSize(row);
    rowSetHeight(row);
    rowGetDistance(row);
    rowOnScroll(row);
  }

  function ran() {
    window.clearTimeout(isResizing);
    isResizing = setTimeout(function () {
      run();
    }, RESIZE_TIMEOUT);
  }

  var isResizing;
  window.removeEventListener("resize", ran);
  window.addEventListener("resize", ran);
}

export default ImageRow;
