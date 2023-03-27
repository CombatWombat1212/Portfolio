import { addKey, caseStudiesInit } from "@/data/CASE_STUDIES";
import {
  EXPLORATIONS_IMGS,
  EXPLORATIONS_IMG_GROUPS,
} from "@/data/EXPLORATIONS_IMGS";
import toggle from "@/scripts/AnimationTools";
import { toTitleCase } from "@/scripts/GlobalUtilities";
import useElementWidth from "@/scripts/hooks/useElementWidth";
import { combineUniqueProperties } from "@/scripts/ProcessImages";
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

// Gallery only
const DISCIPLINE_ORDER = [
  "UX Engineering",
  "3D Design",
  "UI Design",
  "UX Design",
  "Motion Graphics",
  "Photography",
];
const TOOLS_ORDER = [
  "HTML/CSS/JS",
  "Adobe XD",
  "Blender",
  "Adobe Illustrator",
  "Photoshop",
  "Lightroom",
];

const SPECIAL_CASES = {
  disciplines: {
    "UX Design": {
      combineWith: "UI Design",
      displayName: "UI / UX",
      filterBy: ["UI Design", "UX Design"],
    },
    "UX Engineering": {
      combineWith: "Frontend Development",
      displayName: "UX Engineering",
      filterBy: ["Frontend Development", "UX Engineering"],
    },
    "User Research": {
      remove: true,
    },
    // "UX Engineering": {
    //   remove: true,
    // },
  },
  tools: {
    "Photoshop": {
      combineWith: "Lightroom",
      displayName: "Photoshop / Lightroom",
      filterBy: ["Photoshop", "Lightroom"],
    },
    "Adobe XD": {
      combineWith: "Figma",
      displayName: "Figma / XD",
      filterBy: ["Adobe XD", "Figma"],
    },
    "Blender": {
      displayName: "Blender 3D",
    },
    "HTML/CSS/JS": {
      displayName: "HTML / CSS / JS",
    },
    "Adobe Illustrator": {
      displayName: "Illustrator",
    },
    "Adobe Dimension": {
      remove: true,
    },
    "Mural": {
      remove: true,
    },
    "Python": {
      remove: true,
    },
    "API": {
      remove: true,
    },
    ".NET Environment": {
      remove: true,
    },
    "After Effects": {
      remove: true,
    },
  },
};

function handleSpecialCases(items, type) {
  const mapping = SPECIAL_CASES[type];

  const processedItems = items.map((item) => {
    return {
      displayName: mapping[item.name]?.hasOwnProperty("displayName")
        ? mapping[item.name].displayName
        : item.name,
      combineWith: mapping[item.name]?.hasOwnProperty("combineWith")
        ? mapping[item.name].combineWith
        : null,
      filterBy: mapping[item.name]?.hasOwnProperty("filterBy")
        ? mapping[item.name].filterBy
        : item.name,
      remove: mapping[item.name]?.hasOwnProperty("remove")
        ? mapping[item.name].remove
        : false,

      ...item,
      // spread item adds:
      // name: string,
      // key: uuidv4(),
    };
  });

  var removeItems = [];
  for (var i = 0; i < processedItems.length; i++) {
    var item = processedItems[i];
    if (item.combineWith) {
      var combineItem = processedItems.find(
        (i) => i.name === item.combineWith
      );
      if (combineItem) {
        removeItems.push(combineItem);
      }
    }
    if (item.remove) {
      removeItems.push(item);
    }
  }

  const combinedItems = processedItems.filter((item) => {
    return !removeItems.includes(item);
  });

  return combinedItems;
}

function orderArrayByList(array, orderList) {
  // Items not in the order list
  const remainingItems = array
    .filter((item) => {
      const itemName = item.name || item;
      return !orderList.includes(itemName);
    })
    .sort((a, b) => {
      const aName = a.name || a;
      const bName = b.name || b;
      return aName.localeCompare(bName);
    });

  // Sort the items based on the orderList
  const sortedArray = orderList
    .map((orderItem) => array.find((item) => (item.name || item) === orderItem))
    .filter((item) => item !== undefined)
    .concat(remainingItems);

  return sortedArray;
}

function filterByOccurrence(
  array,
  imgGroups,
  propertyName,
  minOccurrence
) {
  return array.filter((item) => {
    const occurrences = countOccurrences(item, imgGroups, propertyName);
    return occurrences >= minOccurrence;
  });
}

function countOccurrences(value, imgGroups, propertyName) {
  let count = 0;
  for (const key in imgGroups) {
    if (imgGroups.hasOwnProperty(key)) {
      const group = imgGroups[key];
      if (group[propertyName] && group[propertyName].includes(value)) {
        count++;
      }
    }
  }
  return count;
}

function Brief({ study }) {
  var brief = study.brief;
  var hasDesc = "brief" in study && "description" in brief;



  // const reference = useRef(null);
  // const width = useElementWidth(reference);

  // useEffect(() => {
  //   console.log('Element width has changed:', width);
  // }, [width]);



  if (study.type == "gallery") {

    // TODO: we need to find a way for this to work on first run
    const IMGS = EXPLORATIONS_IMGS;


    var disciplines = orderArrayByList(
      combineUniqueProperties(IMGS, "disciplines"),
      DISCIPLINE_ORDER
    );
    var tools = orderArrayByList(
      combineUniqueProperties(IMGS, "tools"),
      TOOLS_ORDER
    );

    const minOccurrence = 2;

    var reducedDisciplines = filterByOccurrence(
      disciplines,
      IMGS,
      "disciplines",
      minOccurrence
    );
    var reducedTools = filterByOccurrence(
      tools,
      IMGS,
      "tools",
      minOccurrence
    );

    reducedDisciplines = addKey(reducedDisciplines);
    reducedTools = addKey(reducedTools);

    var processedDisciplines = handleSpecialCases(
      reducedDisciplines,
      "disciplines"
    );
    var processedTools = handleSpecialCases(reducedTools, "tools");



    study.brief = {
      disciplines: processedDisciplines,
      tools: processedTools,
    };
  }

  var briefClasses = `brief--container ${
    hasDesc
      ? "brief--container__study"
      : "brief--container__gallery"
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
      <Point type={"description"} items={brief["description"]} study={study} />
    </div>
  );
}

function Groups({ study }) {
  var brief = study.brief;
  var hasDesc = "brief" in study && "description" in brief;


  var groupClasses = `brief--group ${
    hasDesc
      ? "brief--group__study"
      : "brief--group__gallery"
  }`;


  return (
    <div className={groupClasses}>
      {POINT_ORDER.map((item) => {
        var hasItem = brief && item in brief;
        return (
          hasItem && <Point key={item} type={item} items={brief[item]} study={study} />
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

  if(isStudy){
    title = type.toUpperCase();
    titleType = "h4";
    titleClasses = "brief--title__study";
  } else{
    title = toTitleCase(type);
    titleType = "h3";
    titleClasses = "brief--title__gallery mb-less";
  }


  return (
    <>
      {items && (
        <div className={pointClasses}>
          <Heading type={titleType} className={`brief--title ${titleClasses}`}>{title}</Heading>

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
  type: PropTypes.oneOf(POINT_ORDER),
};

function Tags({ items, type }) {
  var variant =
    type == "tools" ? "tool" : type == "disciplines" ? "regular" : "";

  return (
    <div className="brief--list brief--tags">
      {items.map((item, index) => {
        return (
          <Tag key={`${item.key} ${index}`} variant={variant} filter={item.filterBy}>
            {item.displayName}
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
