import findChildren from "@/scripts/findChildren";
import organizeChildren from "@/scripts/organizeChildren";

function getSplitTitledAbove(titled, foundChildren, organizedColumns) {
  if (titled === "above" && foundChildren.columns) {
    if (organizedColumns.length === 2) {
      const column1Components = Array.isArray(organizedColumns[0].props.children)
        ? organizedColumns[0].props.children
        : Array.of(organizedColumns[0].props.children);
      const column2Components = Array.isArray(organizedColumns[1].props.children)
        ? organizedColumns[1].props.children
        : Array.of(organizedColumns[1].props.children);

      const col1TitleOrHeading =
        column1Components.length === 1 && (column1Components[0].type.name === "Title" || column1Components[0].type.name === "Heading");
      const col2TitleOrHeading =
        column2Components.length === 1 && (column2Components[0].type.name === "Title" || column2Components[0].type.name === "Heading");

      const col1Description = column1Components.length === 1 && column1Components[0].type.name === "Description";
      const col2Description = column2Components.length === 1 && column2Components[0].type.name === "Description";

      if ((col1TitleOrHeading && col2Description) || (col2TitleOrHeading && col1Description)) {
        return true;
      }
    }
  }

  return false;
}

function updateChildrenSplitTitled(children, titled,foundChildren, organizedColumns, isSplitTitledAbove, desktop) {
  if (!desktop && isSplitTitledAbove) {
    const newChildren = children.flatMap((child) => {
      if (child.type.name === "Column") {
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
