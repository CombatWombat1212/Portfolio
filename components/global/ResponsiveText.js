function ResponsiveText({ data, tag = "span" }) {
  const isString = typeof data === "string";
  const keys = typeof data === "object" ? Object.keys(data) : [];

  const Elem = tag;

  return (
    <>
      {isString ? (
        <Elem>{data}</Elem>
      ) : (
        keys.map((key, i) => (
          <Elem key={i} className={`${getFirstDefinedKeyClass(keys, i)} ${formatClass(key, "block")} ${getNextDefinedKeyClass(key, keys)}`}>
            {data[key]}
          </Elem>
        ))
      )}
    </>
  );
}

function getNextDefinedKeyClass(currentKey, keys) {
  const currentIndex = keys.indexOf(currentKey);
  const nextKey = keys[currentIndex + 1];
  return nextKey ? `${formatClass(nextKey, "none")}` : "";
}

function getFirstDefinedKeyClass(keys, currentIndex) {
  const firstKey = keys[0];
  return firstKey && currentIndex !== 0 ? `${formatClass(firstKey, "none")}` : "";
}

function formatClass(key, display) {
  return key === "xxl" ? `d-${display}` : `d-${key}-${display}`;
}

export default ResponsiveText;
