import { addKey, caseStudiesInit } from "@/data/CASE_STUDIES";
import {
  EXPLORATIONS_IMGS,
  EXPLORATIONS_IMG_GROUPS,
} from "@/data/EXPLORATIONS_IMGS";
import toggle from "@/scripts/AnimationTools";
import { toTitleCase } from "@/scripts/GlobalUtilities";
import useElementWidth from "@/scripts/hooks/useElementWidth";
import { defaultProps, PropTypes } from "prop-types";
import { useEffect, useRef } from "react";
import Tag from "../elements/Tag";
import Heading from "../sections/Heading";

const POINT_ORDER = [
  "deliverables",
  "roles",
  "timeline",
  "disciplines",
  "tools",
];
const LIST_TYPES = ["roles", "deliverables", "tools", "disciplines"];
const TAG_TYPES = ["tools", "disciplines"];
const STRING_TYPES = ["timeline", "description"];

function Brief({ study }) {
  var brief = study.brief;
  var hasDesc = "brief" in study && "description" in brief;

  var briefClasses = `brief--container ${
    hasDesc ? "brief--container__study" : "brief--container__gallery"
  }`;

  return (
    <div className="brief">
      <div className={`container container__wide ${briefClasses}`}>
        {hasDesc && <Desc study={study} />}
        <Groups study={study} />
      </div>
    </div>
  );
}

function Desc({ study }) {
  var brief = study.brief;
  return (
    <div className="brief--group">
      <Point
        type={"description"}
        items={brief["description"]}
        study={study}
      />
    </div>
  );
}

function Groups({ study }) {
  var brief = study.brief;
  var hasDesc = "brief" in study && "description" in brief;

  var groupClasses = `brief--group ${
    hasDesc ? "brief--group__study" : "brief--group__gallery"
  }`;

  var briefItems = Object.keys(brief).filter((item) => {
    return (brief && item in brief) && item != "description";
  });

  var notTagItems = briefItems.filter((item) => {
    return !TAG_TYPES.includes(item);
  });


  return (
    <div className={groupClasses}
    style={{
      '--brief-items': briefItems.length,
      '--brief-items_non-tags': notTagItems.length,
    }}
    >
      {POINT_ORDER.map((item) => {
        var hasItem = brief && item in brief;
        return (
          hasItem && (
            <Point
              key={item}
              type={item}
              items={brief[item]}
              study={study}
            />
          )
        );
      })}
    </div>
  );
}

function Point({ items, type, study }) {
  var pointClasses = " ";
  var itemClasses;

  var isList = LIST_TYPES.includes(type);
  var isTags = TAG_TYPES.includes(type);
  var isStudy = study.type == "study";

  if (type == "description") {
    itemClasses = "text--h3";
    pointClasses += "brief--desc";
  }

  if (type != "description") {
    pointClasses += "brief--point";
  }

  var title, titleType, titleClasses;

  if (isStudy) {
    title = type.toUpperCase();
    titleType = "h4";
    titleClasses = "brief--title__study";
  } else {
    title = toTitleCase(type);
    titleType = "h3";
    titleClasses = "brief--title__gallery mb-less";
  }

  return (
    <>
      {items && (
        <div className={pointClasses}
        style={{
          '--point-is-tag': isTags ? 1 : 0,
        }}
        >
          <Heading
            type={titleType}
            className={`brief--title ${titleClasses}`}>
            {title}
          </Heading>

          {isList ? (
            <>
              {isTags ? (
                <Tags items={items} type={type} />
              ) : (
                <List items={items} itemClasses={itemClasses} />
              )}
            </>
          ) : (
            <p className={itemClasses}>{items}</p>
          )}
        </div>
      )}
    </>
  );
}

Point.propTypes = {
  type: PropTypes.oneOf(["description", ...POINT_ORDER]),
};

function Tags({ items, type }) {
  var variant =
    type == "tools" ? "tool" : type == "disciplines" ? "regular" : "";

  return (
    <div className="brief--list brief--tags">
      {items.map((item, index) => {
        return (
          <Tag
            key={`${item.key} ${index}`}
            variant={variant}
            filter={item.filterBy}>
            {item.displayName || item.name}
          </Tag>
        );
      })}
    </div>
  );
}

function List({ items, itemClasses }) {
  return (
    <ul className="brief--list">
      {items.map((item, index) => {
        return (
          <li key={`${item.key} ${index}`} className={itemClasses}>
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Brief;
