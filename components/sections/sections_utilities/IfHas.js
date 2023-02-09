
function getHasText(childs) {
    var hasText = false;
    var { description, title, heading } = childs;
    if (description.length != 0 || title.length != 0 || heading.length != 0) hasText = true;
    return hasText;
  }
  
  function getHasGraphic(graphic) {
    var hasGraphic = false;
    hasGraphic = graphic.length != 0;
    return hasGraphic;
  }
  

  function getHasBackground(background) {
    var hasBackground = false;
    if (background != "background") hasBackground = true;
    return hasBackground;
  }
  

  export {getHasText, getHasGraphic, getHasBackground};