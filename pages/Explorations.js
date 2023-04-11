import Section, { Chapter, Column, Graphic, Heading } from "@/components/sections/Sections";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { STUDY_EXPLORATIONS } from "@/data/CASE_STUDIES";
import { EXPLORATIONS_IMGS, EXPLORATIONS_IMG_GROUPS, EXPLORATIONS_ORDER } from "@/data/EXPLORATIONS_IMGS";
import { play, stack } from "@/data/ICONS";
import { IMAGE_TYPES, VIDEO_TYPES, ensureArray } from "@/scripts/GlobalUtilities";
import {useMemo } from "react";

function Explorations({ pop }) {
  const study = STUDY_EXPLORATIONS;

  const disciplines = study.brief.disciplines;

  const ungroupedImages = Object.values(EXPLORATIONS_IMGS).filter((img) => !img.group);
  const groupedImages = Object.values(EXPLORATIONS_IMG_GROUPS);

  const GALLERY_CONTENT = [...ungroupedImages, ...groupedImages].map((item) => ({
    ...item,
    drawn: false,
  }));

  const orderedDisciplines = useOrderedDisciplines(disciplines, EXPLORATIONS_ORDER);
  const orderedItems = useOrderedItems(GALLERY_CONTENT, orderedDisciplines, EXPLORATIONS_ORDER);

  return (
    <>
      <CaseStudyPage id={study.id} study={study}>
        {orderedDisciplines.map((discipline) => {
          // const orderedItems = useOrderedItems(GALLERY_CONTENT, discipline.name, EXPLORATIONS_ORDER);
          const disciplineItems = orderedItems[discipline.name];

          return (
            <Chapter key={discipline.name} id={discipline.name} name={discipline.name}>
              <Section id={`${discipline.name}--Section`} className="gallery--section" mainType="grid" background="none">
                <Heading>{discipline.displayName}</Heading>
                {...disciplineItems.map((item) => {
                  if (item.drawn) return;
                  item.drawn = true;

                  const { isGroup, type, isVideo, isStack, img, thumb } = getMediaDetails({ item }, { onlyFirst: true });

                  return (
                    <Column key={img.src}>
                      <Graphic
                        className="gallery--graphic"
                        type={type}
                        img={thumb}
                        // {...popup}
                        gallery={img}
                        pop={pop}
                      />

                      {(isVideo || isStack) && (
                        <>
                          <div className="gallery--icons">
                            {isVideo && <Graphic type="mask" img={play} className="gallery--icon" />}
                            {isStack && <Graphic type="mask" img={stack} className="gallery--icon" />}
                          </div>
                        </>
                      )}
                    </Column>
                  );
                })}
              </Section>
            </Chapter>
          );
        })}
      </CaseStudyPage>
    </>
  );
}

function useOrderedDisciplines(disciplines, explorationsOrder) {
  return useMemo(() => {
    const orderedDisciplines = [];
    const unorderedDisciplines = [];

    for (const discipline of disciplines) {
      const disciplineName = discipline.name;
      const isOrdered = Object.keys(explorationsOrder).includes(disciplineName);
      if (!isOrdered) {
        unorderedDisciplines.push(discipline);
      }
    }

    for (const disciplineName in explorationsOrder) {
      const discipline = disciplines.find((d) => d.name === disciplineName);
      if (discipline) {
        orderedDisciplines.push(discipline);
      }
    }

    return [...orderedDisciplines, ...unorderedDisciplines];
  }, [disciplines, explorationsOrder]);
}

function useOrderedItems(items, disciplines, explorationsOrder) {
  return useMemo(() => {
    const disciplinesState = {};

    disciplines.forEach((discipline) => {
      const disciplineName = discipline.name;

      const itemsWithDiscipline = items.filter((item) => {
        if (!item.disciplines.includes(disciplineName)) {
          return false;
        }

        // If an item is under multiple disciplines, prioritize the one specified in EXPLORATIONS_ORDER
        for (const [otherDiscipline, disciplineInfo] of Object.entries(explorationsOrder)) {
          if (otherDiscipline === disciplineName) {
            continue;
          }

          if (item.disciplines.includes(otherDiscipline) && disciplineInfo.projects.includes(item.name)) {
            return false;
          }
        }

        return true;
      });

      disciplinesState[disciplineName] = orderItems(itemsWithDiscipline, explorationsOrder[disciplineName]);
    });

    return disciplinesState;

    function orderItems(items, disciplineInfo) {
      const orderedItems = [];
      const unorderedItems = [];

      if (disciplineInfo && disciplineInfo.projects) {
        disciplineInfo.projects.forEach((project) => {
          const foundItem = items.find((item) => item.name === project);

          if (foundItem) {
            orderedItems.push(foundItem);
          }
        });

        unorderedItems.push(...items.filter((item) => !orderedItems.includes(item)));
      } else {
        unorderedItems.push(...items);
      }

      return [...orderedItems, ...unorderedItems];
    }
  }, [items, disciplines, explorationsOrder]);
}

function getIsGroup(item) {
  return item.imgs ? true : false;
}

function setItemType(item, isGroup) {
  if (isGroup) {
    const thumbnailImg = item.imgs.find((img) => img.thumbnail === true);
    item.type = thumbnailImg ? thumbnailImg.type : item.imgs[0].type;
  }
  item.type = item.type.toLowerCase();
}

function getThumbnail(item, isGroup) {
  if (!isGroup) {
    return item;
  } else {
    const thumbnailImg = item.imgs.find((img) => img.thumbnail === true);
    return thumbnailImg || item.imgs[0];
  }
}

function getImg(item, isGroup) {
  if (isGroup) {
    for (let i = 0; i < item.imgs.length; i++) {
      if (!item.imgs[i].hidden) {
        return item.imgs[i];
      }
    }
  }
  return item;
}

function getIsVideo(isGroup, type, item, options) {
  if (!isGroup && type === "video") {
    return true;
  }
  if (isGroup) {
    if (options.onlyFirst) {
      const firstNonHiddenImg = item.imgs.find((img) => !img.hidden);
      return firstNonHiddenImg && VIDEO_TYPES.includes(firstNonHiddenImg.type.toLowerCase());
    } else {
      const videoItem = item.imgs.find((img) => !img.hidden && VIDEO_TYPES.includes(img.type.toLowerCase()));
      return videoItem !== undefined;
    }
  }
  return false;
}

function getIsStack(isGroup, item) {
  if (isGroup) {
    const visibleImgs = item.imgs.filter((img) => !img.hidden);
    return visibleImgs.length > 1;
  }
  return false;
}

function getMediaType(item) {
  return IMAGE_TYPES.includes(item.type) ? "image" : "video";
}

function getMediaDetails({ item }, options = { onlyFirst: false }) {
  const isGroup = getIsGroup(item);
  setItemType(item, isGroup);

  const type = getMediaType(item);
  const isVideo = getIsVideo(isGroup, type, item, options);
  const isStack = getIsStack(isGroup, item);
  const thumb = getThumbnail(item, isGroup);
  const img = getImg(item, isGroup);

  return { isGroup, type, isVideo, isStack, img, thumb };
}

export default Explorations;
