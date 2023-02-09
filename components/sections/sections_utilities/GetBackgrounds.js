const BACKGROUND_COLORS = ["background", "background darker", "background darkest", "primary", "secondary", "tertiary", "tertiary light", "makeright tertiary"];

function getHasBackground(background) {
  var hasBackground = false;
  if (background != "background") hasBackground = true;
  return hasBackground;
}

function getBackgroundClasses(pref, background) {
  var backgroundClasses = ``;
  if (background == undefined) return backgroundClasses;

  if (typeof background == "string") {
    if (BACKGROUND_COLORS.indexOf(background) != -1) {
      if (pref == "chapter" && background != "background") backgroundClasses += ` ${pref}__color`;
      else if (pref == "section") backgroundClasses += ` ${pref}__color`;
      else if (pref == "section--quote") backgroundClasses += ` ${pref}__color`;
      else if (pref == "section--description") backgroundClasses += ` ${pref}__color`;
    }

    if (pref == "section--graphic") backgroundClasses += ` graphic--panel`;

    if (background == "primary") backgroundClasses += ` background__primary`;
    if (background == "makeright tertiary") backgroundClasses += ` background__makeright-tertiary`;
    if (background == "tertiary") backgroundClasses += ` background__tertiary`;
    if (background == "tertiary light") backgroundClasses += ` background__tertiary-light`;
    if (background == "background") backgroundClasses += ` background__background`;
    if (background == "background darker") backgroundClasses += ` background__background background__background-darker`;
    if (background == "background darkest") backgroundClasses += ` background__background background__background-darkest`;
  } else if (typeof background == "object") {
    backgroundClasses += ` ${pref}__image`;
  }
  return backgroundClasses;
}

export { BACKGROUND_COLORS, getHasBackground, getBackgroundClasses };
