import { addKey } from "@/data/CASE_STUDIES";
import { EXPLORATIONS_IMGS } from "@/data/EXPLORATIONS_IMGS";
import { combineUniqueProperties } from "@/scripts/ProcessImages";

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
    Photoshop: {
      combineWith: "Lightroom",
      displayName: "Photoshop / Lightroom",
      filterBy: ["Photoshop", "Lightroom"],
    },
    "Adobe XD": {
      combineWith: "Figma",
      displayName: "Figma / XD",
      filterBy: ["Adobe XD", "Figma"],
    },
    Blender: {
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
    Mural: {
      remove: true,
    },
    Python: {
      remove: true,
    },
    API: {
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
    .map((orderItem) =>
      array.find((item) => (item.name || item) === orderItem)
    )
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

function processTagLists(items, type, orderList) {
  const minOccurrence = 2;
  const orderedItems = orderArrayByList(items, orderList);
  const reducedItems = filterByOccurrence(
    orderedItems,
    EXPLORATIONS_IMGS,
    type,
    minOccurrence
  );
  const processedItems = handleSpecialCases(addKey(reducedItems), type);
  return processedItems;
}

function processGallery(study) {
  const IMGS = EXPLORATIONS_IMGS;

  const disciplines = combineUniqueProperties(IMGS, "disciplines");
  const tools = combineUniqueProperties(IMGS, "tools");

  study.brief = {
    disciplines: processTagLists(
      disciplines,
      "disciplines",
      DISCIPLINE_ORDER
    ),
    tools: processTagLists(tools, "tools", TOOLS_ORDER),
  };

  return study;
}

export { processGallery };
