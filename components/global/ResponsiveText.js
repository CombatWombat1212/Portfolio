import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import React from "react";

function ResponsiveText({ data: dataProp, tag = "span", children }) {
  const Elem = tag;
  dataProp = dataProp || children || "";
  const is = getIs(dataProp, tag);
  const { keys, data } = getKeys(dataProp, is);

  return (
    <>
      {is.string ? (
        
        <ResElem keyIndex={0} data={data} elem={Elem} />
      ) : is.fragment ? (
        <ResFrag data={data} />
      ) : is.data ? (
        keys.map((key, i) => {
          return <ResElem key={i} keyIndex={i} className={getDataClasses(keys, key, i)} data={data[key]} elem={Elem} />;
        })
      ) : null}
    </>
  );
}

function ResFrag({ data }) {
  const { bp, isBp, loading } = useResponsive();
  const cascadeData = getCascadeData(data);
  const text = !(!isBp(bp) || loading) ? cascadeData[bp] : cascadeData["xxl"];
  return <>{text}</>;
}

function ResElem({ keyIndex, className = "", data, elem: Elem }) {
  return (
    <Elem key={keyIndex} className={className}>
      {data}
    </Elem>
  );
}

function getCascadeData(data) {
  const breakpoints = ["xs", "sm", "md", "lg", "xl", "xxl"];
  let lastDefinedValue = data[breakpoints[0]];
  const cascadeData = breakpoints.reduceRight((acc, currBp) => {
    if (data[currBp] !== undefined) {
      lastDefinedValue = data[currBp];
    }
    acc[currBp] = lastDefinedValue;
    return acc;
  }, {});
  return cascadeData;
}

function getKeys(data, is) {
  let keys = typeof data === "object" ? Object.keys(data) : [];

  if (is.jsx) {
    keys = React.Children.map(data, (child) => child.type);
    data = React.Children.toArray(data).reduce((acc, child) => {
      acc[child.type] = child.props.children;
      return acc;
    }, {});
  }

  return { keys, data };
}

function getDataClasses(keys, key, i) {
  let classes = [];
  classes.push(getFirstDefinedKeyClass(keys, i));
  classes.push(formatClass(key, "block"));
  classes.push(getNextDefinedKeyClass(key, keys));
  const className = classes.join(" ").trim();
  return className;
}

function getIs(data, tag) {
  const is = {
    string: typeof data === "string" || typeof data === "number",
    object: typeof data === "object",
    jsx: typeof data === "object" && (data.$$typeof || (data[0] && data[0].$$typeof)),
    fragment: tag == "Fragment" || tag == "fragment",
  };
  is.data = is.object && !is.jsx;

  return is;
}

function getNextDefinedKeyClass(currentKey, keys) {
  const currentIndex = keys.indexOf(currentKey);
  const nextKey = keys[currentIndex + 1];
  let className = nextKey ? formatClass(nextKey, "none") : "";
  return className;
}

function getFirstDefinedKeyClass(keys, currentIndex) {
  const firstKey = keys[0];
  let className = firstKey && currentIndex !== 0 ? formatClass(firstKey, "none") : "";
  return className;
}

function formatClass(key, display) {
  let className = key === "xxl" ? `d-${display}` : `d-${key}-${display}`;
  return className;
}

export default ResponsiveText;
