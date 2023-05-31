import { DEFINED_CHILDREN } from "../Sections";
import { getColClassList } from "./GetClasses";

function getComponentName(child) {
  if (!child || !child.type) return "";

  const { name, displayName } = child.type;

  if (displayName) {
    return displayName.includes(".") ? displayName.split(".")[0] : displayName;
  }

  return name || "";
}

function organizeChildren(allChildren) {
  var allTypes = [...DEFINED_CHILDREN, "Other"];
  var arr = [];

  if (allChildren.length == undefined) allChildren = [allChildren];
  allChildren = allChildren.filter((child) => typeof child === "object");

  for (var i = 0; i < allTypes.length; i++) {
    arr.push({ type: allTypes[i].toLocaleLowerCase(), elems: [] });
  }

  for (var i = 0; i < allTypes.length; i++) {
    var type = arr[i].type;

    if (type != "other") {
      arr[i].elems = allChildren.filter((child) => {
        if (!child.type) return false; // Check if type is defined

        const componentName = getComponentName(child);
        return componentName === allTypes[i];
      });
    } else {
      arr[i].elems =
        allChildren.filter((child) => {
          if (!child.type) return false; // Check if type is defined
          const componentName = getComponentName(child);
          return DEFINED_CHILDREN.indexOf(componentName) === -1;
        }) || null;
    }
  }

  return arr;
}

// function getSectionChildren(children) {
//   var allChildren = children;

//   var allTypes = [...DEFINED_CHILDREN, "Other"];

//   var organizedChildren = [];

//   organizedChildren = organizeChildren(allChildren);

//   var [columns, description, title, heading, graphic, quote, other] = [organizedChildren[0].elems, organizedChildren[1].elems, organizedChildren[2].elems, organizedChildren[3].elems, organizedChildren[4].elems, organizedChildren[5].elems, organizedChildren[6].elems];

//   if (columns.length != 0) {
//     for (var i = 0; i < columns.length; i++) {
//       var column = columns[i];

//       var columnClasses = getColClassList(column.props.className);

//       var columnChildren = column.props.children;
//       var organizedColumnChildren = organizeChildren(columnChildren);

//       var [columnColumns, columnDescription, columnTitle, columnHeading, columnGraphic, columnQuote, columnOther] = [organizedColumnChildren[0].elems, organizedColumnChildren[1].elems, organizedColumnChildren[2].elems, organizedColumnChildren[3].elems, organizedColumnChildren[4].elems, organizedColumnChildren[5].elems, organizedColumnChildren[6].elems];

//       columns[i] = {
//         columns: columnColumns,
//         description: columnDescription,
//         title: columnTitle,
//         heading: columnHeading,
//         graphic: columnGraphic,
//         quote: columnQuote,
//         other: columnOther,
//         props: {
//           classes: columnClasses,
//           ...column.props,
//         },
//       };
//     }
//   }

//   return { columns, description, title, heading, graphic, quote, other };
// }

function getSectionChildren(children) {
  // Step 1: Organize children
  var organizedChildren = organizeChildren(children);

  // Step 2: Decompose the organizedChildren object into individual variables
  var columns = organizedChildren[0].elems;
  var description = organizedChildren[1].elems;
  var title = organizedChildren[2].elems;
  var heading = organizedChildren[3].elems;
  var graphic = organizedChildren[4].elems;
  var quote = organizedChildren[5].elems;
  var other = organizedChildren[6].elems;

  // Step 3: Handle columns
  if (columns.length != 0) {
    for (var i = 0; i < columns.length; i++) {
      // Handle each column
      var currentColumn = columns[i];

      var columnClasses = getColClassList(currentColumn.props.className);

      var columnChildren = currentColumn.props.children;
      var organizedColumnChildren = organizeChildren(columnChildren);

      // Decompose the organizedColumnChildren object into individual variables
      var columnColumns = organizedColumnChildren[0].elems;
      var columnDescription = organizedColumnChildren[1].elems;
      var columnTitle = organizedColumnChildren[2].elems;
      var columnHeading = organizedColumnChildren[3].elems;
      var columnGraphic = organizedColumnChildren[4].elems;
      var columnQuote = organizedColumnChildren[5].elems;
      var columnOther = organizedColumnChildren[6].elems;

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
          ...currentColumn.props,
        },
      };
    }
  }

  // Step 4: Return the organized children
  return { columns, description, title, heading, graphic, quote, other };
}

export { getSectionChildren };
