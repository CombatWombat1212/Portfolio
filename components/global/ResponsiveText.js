import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import React from "react";

function ResponsiveText({ data: dataProp, tag = "span", children, className = "" }) {
  const Elem = tag;
  dataProp = dataProp || children || "";

  const { is, keys, data } = getDetails(dataProp, tag);

  const renderString = () => {
    return is.fragment ? <>{data}</> : <Elem>{data}</Elem>;
  };

  const renderFragment = () => {
    return <ResFrag data={data} />;
  };

  const renderData = () => {
    return keys.map((key, i) => (
      <ResElem key={i} keyIndex={i} className={getDataClasses(keys, key, i) + ` ${className}`} data={data[key]} elem={Elem} />
    ));
  };

  return <>{is.string ? renderString() : is.fragment ? renderFragment() : is.data ? renderData() : null}</>;
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

function getDetails(dataProp, tag) {
  const initialIs = getIs(dataProp, tag);

  var data = dataProp;
  var keys = typeof dataProp === "object" ? Object.keys(dataProp) : [];

  if (initialIs.jsx) {
    data = getJSXData(dataProp);
    keys = getJSXKeys(dataProp);
  }

  const is = getIs(data, tag);
  return { is, keys, data };
}

function getJSXData(data) {
  return React.Children.toArray(data).reduce((acc, child) => {
    acc[child.type] = child.props.children;
    return acc;
  }, {});
}

function getJSXKeys(data) {
  return React.Children.map(data, (child) => child.type);
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
    jsx: Boolean(typeof data === "object" && (data.$$typeof || (Array.isArray(data) && data.some((item) => item.$$typeof)))),
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
