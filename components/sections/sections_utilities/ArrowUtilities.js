import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";
import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import { useCallback, useEffect, useState } from "react";

var allAnchoredArrows = [];

function refreshAnchorHeight() {
  if (allAnchoredArrows.length == 0) return;

  for (var i = 0; i < allAnchoredArrows.length; i++) {
    var { anchor, arrow } = allAnchoredArrows[i];

    var anchorParent = anchor.parentElement;

    var anchorPreviousSiblings = [];
    var anchorNextSiblings = [];

    anchorPreviousSiblings = Array.from(anchorParent.children).slice(0, Array.from(anchorParent.children).indexOf(anchor));
    anchorPreviousSiblings = anchorPreviousSiblings.filter((sibling) => {
      if (sibling.classList.contains("arrow--column")) return false;
      else return true;
    });
    anchorNextSiblings = Array.from(anchorParent.children).slice(Array.from(anchorParent.children).indexOf(anchor) + 1, anchorParent.children.length);

    var arrowHeight = splitPx(window.getComputedStyle(arrow).height);
    var anchorHeight =
      splitPx(window.getComputedStyle(anchor).height) +
      splitPx(window.getComputedStyle(anchor).paddingTop) +
      splitPx(window.getComputedStyle(anchor).paddingBottom);

    var anchorPreviousSiblingsHeight = 0,
      anchorNextSiblingsHeight = 0;

    for (var j = 0; j < anchorPreviousSiblings.length; j++) {
      anchorPreviousSiblingsHeight +=
        splitPx(window.getComputedStyle(anchorPreviousSiblings[j]).height) +
        splitPx(window.getComputedStyle(anchorPreviousSiblings[j]).marginBottom) +
        splitPx(window.getComputedStyle(anchorPreviousSiblings[j]).marginTop);
    }

    anchorPreviousSiblingsHeight += splitPx(window.getComputedStyle(anchor).marginTop);

    for (var j = 0; j < anchorNextSiblings.length; j++) {
      anchorNextSiblingsHeight += splitPx(window.getComputedStyle(anchorNextSiblings[j]).height);
    }

    var arrowMarginTop = anchorPreviousSiblingsHeight + anchorHeight / 2 - arrowHeight / 2;

    arrow.style.setProperty("--arrow-margin-top", `${arrowMarginTop}px`);
  }
}


function unhideHiddenArrows(){
  const arrows = document.querySelectorAll(".arrow--column__hidden");
  arrows.forEach((arrow) => {
    arrow.classList.remove("arrow--column__hidden");
  }
  )
}


function getAnchoredArrows() {
  var arrows = document.querySelectorAll(".arrow--mask__anchored");
  arrows = Array.from(arrows);

  var targetClassName = "section--graphic";

  for (var i = 0; i < arrows.length; i++) {
    var arrowElement = arrows[i];
    var arrow = arrows[i];
    arrow.closest(".arrow--column").classList.remove("arrow--column__hidden");

    var anchor = null;
    while (!anchor) {
      let graphic = arrow.querySelector(`.${targetClassName}:not([class*="arrow"])`);
      if (graphic) {
        anchor = graphic;
        break;
      } else {
        arrow = arrow.parentElement;
        if (!arrow) {
          break;
        }
      }
    }

    if (!anchor) continue;

    if (!allAnchoredArrows.some((entry) => entry.arrow === arrowElement && entry.anchor === anchor)) {
      allAnchoredArrows.push({ arrow: arrowElement, anchor: anchor });
    }
  }
}

function useAnchoredArrowsInit(children, options = {}) {
  const hasDynamicArrows = Boolean(children?.some((child) => {
    if (child.type.name === "Chapter" || child.type.displayName === "Chapter") {
      const chapterChildren = Array.isArray(child.props.children) ? child.props.children : [child.props.children];
      if (chapterChildren.length === 0 || chapterChildren[0] == undefined) return false;
      return chapterChildren.some(
        (chapterChild) => (chapterChild.type.name === "Section" || chapterChild.type.displayName === "Section") && chapterChild.props.arrows
      );
    }
    return false;
  }));
  useRunAnchoredArrows(hasDynamicArrows, options);
}

function useRunAnchoredArrows(hasDynamicArrows, options) {

  const { update = null, timeout = 0 } = options;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined" || !hasDynamicArrows) {
      return;
    }
    setMounted(true);
  }, [hasDynamicArrows]);

  useEffect(() => {
    if (!mounted) return;
    run();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      run();
    }, timeout);
  }, [update]);

  function run() {
    unhideHiddenArrows();
    getAnchoredArrows();
    refreshAnchorHeight();
    removeExcessArrows();
  }

  var isResizing;

  const ran = useCallback(() => {
    window.clearTimeout(isResizing);
    isResizing = setTimeout(function () {
      run();
    }, RESIZE_TIMEOUT);
  }, [run]); // assuming `run` is stable across renders
  
  useHorizontalResize(ran);
  }






function removeExcessArrows() {

  var gridSections = document.querySelectorAll(".section--main__grid");

  gridSections = Array.from(gridSections).filter((section) => {
    var arrows = section.querySelectorAll(".arrow--column");
    if (arrows.length > 0) return true;
    else return false;
  });

  gridSections.forEach((section) => {
    var columns = getComputedStyle(section).gridTemplateColumns;
    var columnCount = columns.split(" ").length;

    var children = section.children;
    for (var i = 0; i < children.length; i += columnCount) {
      var firstElement = children[i];
      var arrow = firstElement.querySelector(".arrow--column");
      if (arrow) {
        arrow.classList.add("arrow--column__hidden");
      }
    }
  });
}

export { useAnchoredArrowsInit, removeExcessArrows };
