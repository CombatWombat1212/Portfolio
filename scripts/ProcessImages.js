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
  





export {processGroups, processImages};