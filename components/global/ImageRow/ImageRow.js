import { clamp, map, RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import { useEffect, useRef, useState } from "react";
import { addClassToJsxObj, addStyleToJsxObj } from "../../sections/sections_utilities/ClassUtilities";
import ImageRowObj from "./ImageRowObj";
import useInView from "@/scripts/hooks/useInView";

function ImageRow({ children, className, col, direction, type: scrollType = "scroll" }) {
  const [mounted, setMounted] = useState(false);
  const [currentCol, setCurrentCol] = useState(col);
  const reference = useRef(null);
  const row = useRef(null);
  const count = children.length;
  const inView = useInView(reference);

  useEffect(() => {
    if (!reference.current || row.current) return;
    setMounted(true);
  }, [reference, row]);

  useEffect(() => {
    if (mounted) {
      if (row.current) row.current.clearInterval();
      row.current = new ImageRowObj(reference, inView, scrollType, direction);
      rowInit({ row });
    }

    return () => {
      if (row.current) {
        if (row.current.is.scroll) row.current.resetAutoScroll();
        row.current.clearInterval();
        row.current.clearResizeListener();
      }
    };
  }, [mounted]);

  useEffect(() => {
    setCurrentCol(col);
  }, [col]);

  var childs = children.map((child, index) => {
    var el = addClassToJsxObj(child, `image-row--image image-row--image__${scrollType}`);
    el = addStyleToJsxObj(el, "--image-row-index", index);
    if (scrollType == "auto") el = addStyleToJsxObj(el, "--image-row-cycle", 0);
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
        "--image-row-count": count,
        "--in-view": `${inView ? "true" : "false"}`,
      }}
      ref={reference}>
      <div className={`image-row--wrapper ${!inView || "image-row--wrapper__inview"}`}
      >{childs}</div>
    </div>
  );
}

ImageRow.defaultProps = {
  direction: "right",
};
ImageRow.displayName = "ImageRow";

function rowInit({ row: rowRef }) {
  const row = rowRef.current;
  row.onLoad();
  if (row.type == "scroll") {
    row.addScrollObserver();
  } else if (row.type == "auto") {
  }
  row.setResizeListener();
}

export default ImageRow;
