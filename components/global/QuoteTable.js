import { Fragment } from "react";
import Quote from "../sections/Quote";

function QuoteTable({ data }) {
  return (
    <div className="quote-table">
      {data.sections.map((section, i) => (
        <Body section={section} key={i} />
      ))}
    </div>
  );
}

function Body({ section }) {
  const hasTitle = section.title !== false;
  return (
    <>
      {hasTitle && (
        <>
          <Subheading type="primary" text={section.title.primary} />
          <Subheading type="secondary" text={section.title.secondary || ""} />
        </>
      )}

      {section.rows.map((row, i) => (
        <Row row={row} key={i} />
      ))}
    </>
  );
}

function Subheading({ text, type }) {
  const classList = ["quote-table--subheading"];
  if (type == "secondary") classList.push("d-md-none");
  const classes = classList.join(" ");

  return (
    <div className={classes}>
      <h3>{text}</h3>
    </div>
  );
}

function Row({ row }) {
  return (
    <>
      <Cell type="primary" item={row.primary} />
      <Cell type="secondary" item={row.secondary} />
    </>
  );
}

function Cell({ type, item }) {
  const isText = typeof item === "string";
  const isObj = typeof item === "object";
  const isQuote = isObj && item.quote;

  const Elem = (() => {
    if (isQuote) return Quote;
    if (isText || isObj) return "div";
  })();

  const renderContent = (item) => {
    if (isText) return renderText(item);
    if (isQuote) return renderText(item.quote);
    if (isObj) return renderObj(item);
  };

  return (
    <>
      <Elem className={`quote-table--cell quote-table--cell__${type}`}>{renderContent(item)}</Elem>
    </>
  );
}

const renderText = (item, props = {}) => {
  const { tag: Tag = "span", className = "" } = props;
  const isJsx = typeof item === "object";
  const children = isJsx ? { children: item } : { dangerouslySetInnerHTML: { __html: item } };

  return (
    <>
      <Tag className={className} {...children} />
    </>
  );
};

const renderObj = (item) => {
  return (
    <>
      {renderText(item.title, { tag: "p", className: "weight-bold mb-1" })}
      {renderText(item.content, { tag: "p" })}
    </>
  );
};

export default QuoteTable;
