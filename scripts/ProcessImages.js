
// // function to check for overlapping indexes within a group
// function checkForOverlappingIndexes(group, index, name) {
//     const currentGroup = MAKERIGHT_IMG_GROUPS[group].imgs;
//     for (let i = 0; i < currentGroup.length; i++) {
//       if (currentGroup[i].index === index) {
//         throw new Error(`Overlapping indexes within group "${group}": ${currentGroup[i].name} and ${name}`);
//       }
//     }
//   }
  
  
//   // function to add sections to a group
//   function addSectionsToGroup(group) {
//     // Check if all images in the group have a section
//     const allHaveSection = MAKERIGHT_IMG_GROUPS[group].imgs.every((img) => {
//       return img.section !== undefined;
//     });
  
//     if (allHaveSection) {
//       // Add sections to the group
//       const sections = [];
//       MAKERIGHT_IMG_GROUPS[group].imgs.forEach((img, index) => {
//         const sectionName = img.section;
//         if (sectionName && !sections.some((section) => section.name === sectionName)) {
//           const sectionStart = index;
//           let sectionEnd = index;
//           // find the end index of the current section
//           for (let i = index + 1; i < MAKERIGHT_IMG_GROUPS[group].imgs.length; i++) {
//             if (MAKERIGHT_IMG_GROUPS[group].imgs[i].section === sectionName) {
//               sectionEnd = i;
//             } else {
//               break;
//             }
//           }
//           sections.push({
//             name: sectionName,
//             start: sectionStart,
//             end: sectionEnd
//           });
//         }
//       });
//       MAKERIGHT_IMG_GROUPS[group].sections = sections;
//     }
//   }
  
  
//   // function to update group properties
//   function updateGroupProperties(group, img) {
//     MAKERIGHT_IMG_GROUPS[group].imgs.push(img);
//     MAKERIGHT_IMG_GROUPS[group].height.min = Math.min(MAKERIGHT_IMG_GROUPS[group].height.min, img.height);
//     MAKERIGHT_IMG_GROUPS[group].height.max = Math.max(MAKERIGHT_IMG_GROUPS[group].height.max, img.height);
//     MAKERIGHT_IMG_GROUPS[group].height.constant = MAKERIGHT_IMG_GROUPS[group].height.constant && img.height === MAKERIGHT_IMG_GROUPS[group].height.min;
//     MAKERIGHT_IMG_GROUPS[group].width.min = Math.min(MAKERIGHT_IMG_GROUPS[group].width.min, img.width);
//     MAKERIGHT_IMG_GROUPS[group].width.max = Math.max(MAKERIGHT_IMG_GROUPS[group].width.max, img.width);
//     MAKERIGHT_IMG_GROUPS[group].width.constant = MAKERIGHT_IMG_GROUPS[group].width.constant && img.width === MAKERIGHT_IMG_GROUPS[group].width.min;
  
//     addSectionsToGroup(group);
  
//     MAKERIGHT_IMG_GROUPS[group].imgs.sort((a, b) => {
//       return a.index - b.index;
//     });
//   }
  
  
  
  
  
  
  
//   // function to process each image in the object
//   function processImage(key) {
//     if (MAKERIGHT_IMGS[key].group) {
//       if (!MAKERIGHT_IMG_GROUPS[MAKERIGHT_IMGS[key].group]) {
//         MAKERIGHT_IMG_GROUPS[MAKERIGHT_IMGS[key].group] = {
//           name: MAKERIGHT_IMGS[key].group,
//           imgs: [],
//           height: {
//             min: Infinity,
//             max: -Infinity,
//             constant: true
//           },
//           width: {
//             min: Infinity,
//             max: -Infinity,
//             constant: true
//           }
//         };
//       }
//       let index = MAKERIGHT_IMGS[key].index;
//       if (typeof index === "undefined") {
//         index = MAKERIGHT_IMG_GROUPS[MAKERIGHT_IMGS[key].group].imgs.length;
//       } else {
//         checkForOverlappingIndexes(MAKERIGHT_IMGS[key].group, index, MAKERIGHT_IMGS[key].name);
//       }
//       MAKERIGHT_IMGS[key].index = index;
//       updateGroupProperties(MAKERIGHT_IMGS[key].group, MAKERIGHT_IMGS[key]);
//     }
//   }
  
  

// //   export {processImage}






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
  
  function processImage(images) {
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
  
    return groups;
  }
  
export {processImage};