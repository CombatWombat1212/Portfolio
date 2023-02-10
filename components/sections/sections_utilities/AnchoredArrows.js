


function refreshAnchorHeight(){

    
}






function anchoredArrowsInit() {
  if (typeof window == "undefined") return;

  var arrows = document.querySelectorAll(".arrow--mask__anchored");
  arrows = Array.from(arrows);

  var targetClassName = "section--graphic";

  for (var i = 0; i < arrows.length; i++) {
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

    if(!anchor) continue;



    var anchorParent = anchor.parentElement;

    var anchorPreviousSiblings = [];
    var anchorNextSiblings = [];

    
    anchorPreviousSiblings = Array.from(anchorParent.children).slice(0, Array.from(anchorParent.children).indexOf(anchor));
    anchorPreviousSiblings = anchorPreviousSiblings.filter((sibling) => {if(sibling.classList.contains("arrow--column")) return false; else return true;});
    anchorNextSiblings = Array.from(anchorParent.children).slice(Array.from(anchorParent.children).indexOf(anchor) + 1, anchorParent.children.length);



    










  }







}

export { anchoredArrowsInit };
