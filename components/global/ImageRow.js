import { clamp, map, splitPx } from "@/scripts/GlobalUtilities";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import { useEffect, useRef, useState } from "react";
import { addClassToJsxObj, addStyleToJsxObj } from "../sections/sections_utilities/ClassUtilities";

function ImageRow({ children, col }) {
  const [mounted, setMounted] = useState(false);

  const reference = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, [reference]);

  useEffect(() => {
    if (!mounted) return;

    var row = reference.current;
    rowInit(row);
  }, [mounted]);

  var childs = children.map((child, index) => {
    var el = addClassToJsxObj(child, "image-row--image");
    el = addStyleToJsxObj(el, "--image-row-index", index);
    return el;
  });

  return (
    <div
      className="image-row"
      style={{
        "--image-row-cols": col,
      }}
      ref={reference}>
      <div className="image-row--wrapper">{childs}</div>
    </div>
  );
}

function rowGetImages(row) {
  var images = Array.from(row.elem.querySelectorAll(".image-row--image"));
  row.images.elems = images;
}

function rowGetImageSize(row) {
  row.images.width = splitPx(getComputedStyle(row.images.elems[0]).getPropertyValue("width"));
  row.images.height = splitPx(getComputedStyle(row.images.elems[0]).getPropertyValue("height"));
}

function rowSetHeight(row) {
  row.elem.style.setProperty("--image-height", `${row.images.height}px`);
}

function rowGetDistance(row) {
  row.distance = window.innerHeight;
}

function rowGetProgress(row) {
  // row.progress is a value between 0 and 1. 0 means that the top of the row is underneath the viewport. 1 means that the bottom of the row is above the viewport.

  // first, calculate progress by comparing the top of the row to the bottom of the viewport
  // then, once the row is in the exact middle of the viewport, calculate progress by comparing the bottom of the row to the top of the viewport
  // this should give a smooth transition between the two calculations, as the middle point should be exactly 0.5

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
  console.log(progress);
}

function rowInit(elem) {
  var row = {
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

  rowGetImages(row);
  rowGetImageSize(row);
  rowSetHeight(row);
  rowGetDistance(row);
  rowSetListeners(row);

  //   add intersection observer to row

  row.observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(row, "in");
        } else {
          console.log(row, "out");
        }
      });
    },
    {
      threshold: 0,
    }
  );

  row.observer.observe(row.elem);

  function rowSetListeners(row) {
    window.addEventListener("scroll", rowOnScroll);
  }

  function rowOnScroll() {
    rowGetDistance(row);
    rowGetProgress(row);
  }
}

export default ImageRow;
