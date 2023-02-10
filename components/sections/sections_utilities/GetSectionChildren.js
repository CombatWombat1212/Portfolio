import { DEFINED_CHILDREN } from "../Sections";
import { getColClassList } from "./GetClasses";

function organizeChildren(allChildren) {
  var allTypes = [...DEFINED_CHILDREN, "Other"];

  var arr = [];

  if (allChildren.length == undefined) allChildren = [allChildren];

  for (var i = 0; i < allTypes.length; i++) {
    arr.push({ type: allTypes[i].toLocaleLowerCase(), elems: [] });
  }

  for (var i = 0; i < allTypes.length; i++) {
    var type = arr[i].type;

    if (type != "other") {
      arr[i].elems = allChildren.filter((child) => child.type.name == allTypes[i]);
    } else {
      arr[i].elems = allChildren.filter((child) => DEFINED_CHILDREN.indexOf(child.type.name) == -1) || null;
    }
  }
  return arr;
}

function getSectionChildren(children) {
  var allChildren = children;

  var allTypes = [...DEFINED_CHILDREN, "Other"];

  var organizedChildren = [];

  organizedChildren = organizeChildren(allChildren);

  var [columns, description, title, heading, graphic, quote, other] = [organizedChildren[0].elems, organizedChildren[1].elems, organizedChildren[2].elems, organizedChildren[3].elems, organizedChildren[4].elems, organizedChildren[5].elems, organizedChildren[6].elems];

  if (columns.length != 0) {
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i];

      var columnClasses = getColClassList(column.props.className);

      var columnChildren = column.props.children;
      var organizedColumnChildren = organizeChildren(columnChildren);

      var [columnColumns, columnDescription, columnTitle, columnHeading, columnGraphic, columnQuote, columnOther] = [organizedColumnChildren[0].elems, organizedColumnChildren[1].elems, organizedColumnChildren[2].elems, organizedColumnChildren[3].elems, organizedColumnChildren[4].elems, organizedColumnChildren[5].elems, organizedColumnChildren[6].elems];

      columns[i] = {
        columns: columnColumns,
        description: columnDescription,
        title: columnTitle,
        heading: columnHeading,
        graphic: columnGraphic,
        quote: columnQuote,
        other: columnOther,
        props: {
          classes: columnClasses,
          ...column.props,
        },
      };
    }
  }

  return { columns, description, title, heading, graphic, quote, other };
}

export { getSectionChildren };
