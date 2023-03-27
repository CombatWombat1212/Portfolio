function checkForOverlappingIndexes(group, index, name, currentGroup) {
  for (let i = 0; i < currentGroup.length; i++) {
    if (currentGroup[i].index === index) {
      throw new Error(`Overlapping indexes within group "${group}": ${currentGroup[i].name} and ${name}`);
    }
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

// function processGroups(images) {
//   const groups = {};

//   for (const key in images) {
//     if (images.hasOwnProperty(key)) {
//       const image = images[key];

//       if (image.group) {
//         if (!groups[image.group]) {
//           groups[image.group] = {
//             name: image.group,
//             imgs: [],
//             height: {
//               min: Infinity,
//               max: -Infinity,
//               constant: true,
//             },
//             width: {
//               min: Infinity,
//               max: -Infinity,
//               constant: true,
//             },
//           };
//         }

//         let index = image.index;

//         if (typeof index === "undefined") {
//           index = groups[image.group].imgs.length;
//         } else {
//           checkForOverlappingIndexes(image.group, index, image.name, groups[image.group].imgs);
//         }

//         image.index = index;
//         updateGroupProperties(image.group, image, groups[image.group]);
//       }
//     }
//   }

//   return groups;
// }

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
    combineUniqueProperties(group, "tools");
    combineUniqueProperties(group, "disciplines");
    collectPropertyValues(group, "description");
  }

  return groups;
}

function processImages(images, study) {
  const processedImages = {};
  study = study || "";
  for (const key in images) {
    if (images.hasOwnProperty(key)) {
      const image = images[key];
      const fileExtension = image.src.split(".").pop();
      image.type = fileExtension;
      image.study = study;
      processedImages[key] = image;
    }
  }
  return processedImages;
}

export { processGroups, processImages, combineUniqueProperties, collectPropertyValues };
