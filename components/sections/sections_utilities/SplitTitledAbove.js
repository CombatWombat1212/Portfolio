import findChildren from "@/scripts/findChildren";
import organizeChildren from "@/scripts/organizeChildren";

// function getSplitTitledAbove(titled, foundChildren, organizedColumns) {
//   if (titled === "above" && foundChildren.columns) {
//     if (organizedColumns.length === 2) {
//       const col1Components = Array.isArray(organizedColumns[0].props.children)
//         ? organizedColumns[0].props.children
//         : Array.of(organizedColumns[0].props.children);
//       const col2Components = Array.isArray(organizedColumns[1].props.children)
//         ? organizedColumns[1].props.children
//         : Array.of(organizedColumns[1].props.children);

//       const col1TitleOrHeading =
//         col1Components.length === 1 && (col1Components[0].type.name === "Title" || col1Components[0].type.name === "Heading");
//       const col2TitleOrHeading =
//         col2Components.length === 1 && (col2Components[0].type.name === "Title" || col2Components[0].type.name === "Heading");

//       const col1Description = col1Components.length === 1 && col1Components[0].type.name === "Description";
//       const col2Description = col2Components.length === 1 && col2Components[0].type.name === "Description";

//       if ((col1TitleOrHeading && col2Description) || (col2TitleOrHeading && col1Description)) {
//         return true;
//       }
//     }
//   }

//   return false;
// }


function getSplitTitledAbove(titled, foundChildren, organizedColumns) {
  if (titled !== "above" || !foundChildren.columns) {
    return false;
  }
  
  if (organizedColumns.length !== 2) {
    return false;
  }
  
  const getColumnComponents = (column) => {
    return Array.isArray(column.props.children) ? column.props.children : [column.props.children];
  };
  
  const isTitleOrHeading = (component) => {
    return ["Title", "Heading"].includes(component.type.name) || ["Title", "Heading"].includes(component.type.displayName);
  };
  
  const isDescription = (component) => {
    return ["Description"].includes(component.type.name) || ["Description"].includes(component.type.displayName);
  };
  
  const col1Components = getColumnComponents(organizedColumns[0]);
  const col2Components = getColumnComponents(organizedColumns[1]);
  
  const col1TitleOrHeading = col1Components.length === 1 && isTitleOrHeading(col1Components[0]);
  const col2TitleOrHeading = col2Components.length === 1 && isTitleOrHeading(col2Components[0]);
  
  const col1Description = col1Components.length === 1 && isDescription(col1Components[0]);
  const col2Description = col2Components.length === 1 && isDescription(col2Components[0]);
  
  return (col1TitleOrHeading && col2Description) || (col2TitleOrHeading && col1Description);
}




function updateChildrenSplitTitled(children, titled,foundChildren, organizedColumns, isSplitTitledAbove, desktop) {
  if (!desktop && isSplitTitledAbove) {
    const newChildren = children.flatMap((child) => {
      if (child.type.name === "Column" || child.type.displayName === "Column") {
        if (Array.isArray(child.props.children)) {
          return child.props.children;
        } else {
          return [child.props.children];
        }
      }
      return child;
    });


    const newFoundChildren = findChildren(newChildren, [
        ["titles", { elemType: "Title" }],
        ["headings", { elemType: "Heading" }],
        ["columns", { elemType: "Column" }],
      ]);
      
    const { columns: newOrganizedColumns } = organizeChildren(newChildren, [["columns", { elemType: "Column" }]]);

    return { 
        children: newChildren, 
        titled: false, 
        foundChildren: newFoundChildren,
        organizedColumns: newOrganizedColumns,
    };
  }
  return { children: children, titled: titled, foundChildren: foundChildren, organizedColumns: organizedColumns };
}

export { getSplitTitledAbove, updateChildrenSplitTitled };
