import { useResponsive } from "@/scripts/contexts/ResponsiveContext";

function Nobr({ children, className = "" }) {
  const { bp } = useResponsive();
  const breakpoints = getClassBreakpoints(className);

  let text = "";
  if (typeof children === "string") text = children;

  if (typeof children === "string" && breakpoints[bp] === "block") {
    text = children.replace(/ /g, "\u00A0"); // Replace spaces with non-breaking spaces
    text = text.replace(/-/g, "\u2011"); // Replace hyphens with non-breaking hyphens
  }

  return <>{text}</>;
}

function getClassBreakpoints(className) {
  // Convert classNames into an array list and filter out any classNames that don't include 'd-'
  const classNames = className.split(" ").filter((cn) => cn.includes("d-"));

  // Define breakpoints
  const breakpoints = {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    xxl: "block", // default to 'block' unless specifically defined
  };

  // Iterate through the classNames to assign {display property value} to the corresponding key of our breakpoint object
  classNames.forEach((cn) => {
    const parts = cn.split("-");

    if (parts.length === 2) {
      // Handle 'd-{display property value}'
      const [d, displayValue] = parts;
      breakpoints["xxl"] = displayValue;
    } else if (parts.length === 3) {
      // Handle 'd-{breakpoint}-{display property value}'
      const [d, bp, displayValue] = parts;
      if (breakpoints.hasOwnProperty(bp)) {
        breakpoints[bp] = displayValue;
      }
    }
  });

  // Apply downwards to fill in the 'null' spots until it hits one that is defined
  const breakpointKeys = Object.keys(breakpoints);
  for (let i = breakpointKeys.length - 1; i > 0; i--) {
    if (breakpoints[breakpointKeys[i - 1]] === null) {
      breakpoints[breakpointKeys[i - 1]] = breakpoints[breakpointKeys[i]];
    }
  }

  return breakpoints;
}
Nobr.displayName = "Nobr";
export default Nobr;

// function Nobr({ children }) {
//     let text = "";

//     if (typeof children === "string") {
//       text = children.replace(/ /g, "\u00A0"); // Replace spaces with non-breaking spaces
//       text = text.replace(/-/g, "\u2011"); // Replace hyphens with non-breaking hyphens
//     }

//     return <>{text}</>;
//   }

//   export default Nobr;
