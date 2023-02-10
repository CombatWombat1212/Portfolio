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
    var anchorHeight = splitPx(window.getComputedStyle(anchor).height);

    var anchorPreviousSiblingsHeight = 0,
      anchorNextSiblingsHeight = 0;

    for (var j = 0; j < anchorPreviousSiblings.length; j++) {
      anchorPreviousSiblingsHeight += splitPx(window.getComputedStyle(anchorPreviousSiblings[j]).height);
    }

    for (var j = 0; j < anchorNextSiblings.length; j++) {
      anchorNextSiblingsHeight += splitPx(window.getComputedStyle(anchorNextSiblings[j]).height);
    }

    var arrowMarginTop = anchorPreviousSiblingsHeight + anchorHeight / 2;
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

  var isResizing;
  window.addEventListener("resize", function (event) {
    window.clearTimeout(isResizing);
    isResizing = setTimeout(function () {
      refreshAnchorHeight();
    }, RESIZE_TIMEOUT);
  });
}

export { anchoredArrowsInit };
