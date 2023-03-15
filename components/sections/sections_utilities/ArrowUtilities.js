import { RESIZE_TIMEOUT, splitPx } from "@/scripts/GlobalUtilities";

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
    var anchorHeight = splitPx(window.getComputedStyle(anchor).height) + splitPx(window.getComputedStyle(anchor).paddingTop) + splitPx(window.getComputedStyle(anchor).paddingBottom);

    var anchorPreviousSiblingsHeight = 0,
      anchorNextSiblingsHeight = 0;

    for (var j = 0; j < anchorPreviousSiblings.length; j++) {
      anchorPreviousSiblingsHeight += splitPx(window.getComputedStyle(anchorPreviousSiblings[j]).height) + splitPx(window.getComputedStyle(anchorPreviousSiblings[j]).marginBottom) + splitPx(window.getComputedStyle(anchorPreviousSiblings[j]).marginTop);
    }

    for (var j = 0; j < anchorNextSiblings.length; j++) {
      anchorNextSiblingsHeight += splitPx(window.getComputedStyle(anchorNextSiblings[j]).height);
    }

    var arrowMarginTop = anchorPreviousSiblingsHeight + (anchorHeight/2) - (arrowHeight/2) ;

    arrow.style.setProperty("--arrow-margin-top", `${arrowMarginTop}px`);
  }
}






function getAnchoredArrows() {
  var arrows = document.querySelectorAll(".arrow--mask__anchored");
  arrows = Array.from(arrows);

  var targetClassName = "section--graphic";

  for (var i = 0; i < arrows.length; i++) {
    var arrowElement = arrows[i];
    var arrow = arrows[i];
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

    allAnchoredArrows.push({ arrow: arrowElement, anchor: anchor });
  }
}




function anchoredArrowsInit() {
  if (typeof window == "undefined") return;

  getAnchoredArrows();
  refreshAnchorHeight();

  
  if(allAnchoredArrows.length == 0) return;
  var isResizing;
  window.addEventListener("resize", function (event) {
    window.clearTimeout(isResizing);
    isResizing = setTimeout(function () {
      refreshAnchorHeight();
    }, RESIZE_TIMEOUT);
  });
  
}




function removeExcessArrows(){
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




export { anchoredArrowsInit, removeExcessArrows };
