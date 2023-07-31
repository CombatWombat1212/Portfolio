import { IMAGE_TYPES, VIDEO_TYPES, ensureArray, getProjectId } from "./GlobalUtilities";

function checkForOverlappingIndexes(group, index, name, currentGroup) {
  for (let i = 0; i < currentGroup.length; i++) {
    if (currentGroup[i].index === index) {
      throw new Error(`Overlapping indexes within group "${group}": ${currentGroup[i].name} and ${name}`);
    }
  }
}

function checkForMultipleThumbnails(groupData) {
  const thumbnails = groupData.imgs.filter((img) => img.thumbnail === true);

  if (thumbnails.length > 1) {
    console.error(`Group "${groupData.name}" has multiple images with thumbnail=true`);
  }
}


function addSectionsToGroup(group, groupImages) {
  const allHaveSection = groupImages.every((img) => img.section !== undefined);

  if (allHaveSection) {
    const sections = [];
    groupImages.forEach((img, index) => {
      const sectionName = img.section;
      if (sectionName && !sections.some((section) => section.name === sectionName)) {
        const sectionStart = index;
        let sectionEnd = index;

        for (let i = index + 1; i < groupImages.length; i++) {
          if (groupImages[i].section === sectionName) {
            sectionEnd = i;
          } else {
            break;
          }
        }

        sections.push({
          name: sectionName,
          start: sectionStart,
          end: sectionEnd,
        });
      }
    });

    return sections;
  }

  return null;
}

function updateGroupProperties(group, img, groupData) {
  groupData.imgs.push(img);
  groupData.height.min = Math.min(groupData.height.min, img.height);
  groupData.height.max = Math.max(groupData.height.max, img.height);
  groupData.height.constant = groupData.height.constant && img.height === groupData.height.min;
  groupData.width.min = Math.min(groupData.width.min, img.width);
  groupData.width.max = Math.max(groupData.width.max, img.width);
  groupData.width.constant = groupData.width.constant && img.width === groupData.width.min;

  const sections = addSectionsToGroup(group, groupData.imgs);

  if (sections) {
    groupData.sections = sections;
  }

  groupData.imgs.sort((a, b) => a.index - b.index);
}


function combineUniqueProperties(groupData, propertyName) {
  function run(group, propertyName) {
    // If the property already exists, return its value
    if (group[propertyName]) {
      return group[propertyName];
    }

    // Otherwise, process the images and accumulate property values
    group[propertyName] = [];
    group?.imgs?.forEach((img) => {
      if (img[propertyName]) {
        const propertyValues = Array.isArray(img[propertyName]) ? img[propertyName] : [img[propertyName]];
        propertyValues.forEach((value) => {
          if (!group[propertyName].includes(value)) {
            group[propertyName].push(value);
          }
        });
      }
    });

    return group[propertyName];
  }

  function flattenAndDedupe(arrays) {
    const flattened = [].concat(...arrays);
    return [...new Set(flattened)];
  }

  if (groupData.imgs) {
    return run(groupData, propertyName);
  } else {
    const propertyValuesArrays = [];
    for (const key in groupData) {
      if (groupData.hasOwnProperty(key)) {
        const group = groupData[key];
        propertyValuesArrays.push(run(group, propertyName));
      }
    }
    return flattenAndDedupe(propertyValuesArrays);
  }
}




function collectPropertyValues(groupData, propertyName) {
  if (!groupData[propertyName]) {
    groupData[propertyName] = Array(groupData.imgs.length).fill("");
  }

  // popuplate array with descriptions from each image
  for (let i = 0; i < groupData.imgs.length; i++) {
    const img = groupData.imgs[i];
    if (img[propertyName]) {
      groupData[propertyName][img.index] = img[propertyName];
    }
  }

  // check if the array has any '' values
  const hasEmptyValues = groupData[propertyName].some((value) => value === "");

  // check if the array has any values that are not ''
  const hasValues = groupData[propertyName].some((value) => value !== "");

  // if the array has both '' and non '' values, then fill all the '' values with the first non '' value
  if (hasEmptyValues && hasValues) {
    const firstValue = groupData[propertyName].find((value) => value !== "");
    groupData[propertyName] = groupData[propertyName].map((value) => (value === "" ? firstValue : value));
  }
}



function passPropertyToGroup(groupData, propertyName) {

  // if all the images in the group have the same value for the property, then pass that value to the group, otherwise do nothing
  const allSame = groupData.imgs.every((img) => img[propertyName] === groupData.imgs[0][propertyName]);
  if (allSame) {
    groupData[propertyName] = groupData.imgs[0][propertyName];
  }


}

function processGroups(images) {
  const groups = {};

  for (const key in images) {
    if (images.hasOwnProperty(key)) {
      const image = images[key];

      if (image.group) {
        if (!groups[image.group]) {
          groups[image.group] = {
            name: image.group,
            imgs: [],
            height: {
              min: Infinity,
              max: -Infinity,
              constant: true,
            },
            width: {
              min: Infinity,
              max: -Infinity,
              constant: true,
            },
          };
        }

        let index = image.index;

        if (typeof index === "undefined") {
          index = groups[image.group].imgs.length;
        } else {
          checkForOverlappingIndexes(image.group, index, image.name, groups[image.group].imgs);
        }

        image.index = index;
        updateGroupProperties(image.group, image, groups[image.group]);
      }
    }
  }

  for (const key in groups) {
    const group = groups[key];
    checkForMultipleThumbnails(group);
    combineUniqueProperties(group, "tools");
    combineUniqueProperties(group, "disciplines");
    collectPropertyValues(group, "description");
    passPropertyToGroup(group, "id");
    passPropertyToGroup(group, "project");
    passPropertyToGroup(group, "projectStr");
  }


  return groups;
}

function processImages(images, collection) {
  const processedImages = {};
  collection = collection || "";
  for (const key in images) {

    const image = images[key];

    if (images.hasOwnProperty(key)) {
      const fileExtension = image.src.split(".").pop();
      image.type = fileExtension.toLowerCase();
      image.media = VIDEO_TYPES.includes(image.type) ? "video" : IMAGE_TYPES.includes(image.type) ? "image" : "unknown";
      image.description = ensureArray(image.description || false) || false;        
      image.collection = collection;
      processedImages[key] = image;
    }

    if(collection == "explorations") {
      const id = getProjectId(image);
      image.id = id;    
    }
  }


  // good to have for testing edge cases if you ever need to debug
  // for (const key in processedImages) {
  //   if (processedImages.hasOwnProperty(key)) {
  //     const image = processedImages[key];
  //     if (image.project && !image.group) {
  //       console.log(image)
  //       console.log(true);
  //     }
  //   }
  // }

  return processedImages;
}




export { processGroups, processImages, combineUniqueProperties, collectPropertyValues };
