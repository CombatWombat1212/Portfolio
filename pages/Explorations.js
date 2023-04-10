import Section, { Chapter, Column, Graphic, Heading } from "@/components/sections/Sections";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { STUDY_EXPLORATIONS } from "@/data/CASE_STUDIES";
import { EXPLORATIONS_IMGS, EXPLORATIONS_IMG_GROUPS, EXPLORATIONS_ORDER } from "@/data/EXPLORATIONS_IMGS";
import { IMAGE_TYPES, VIDEO_TYPES, ensureArray } from "@/scripts/GlobalUtilities";
import { useEffect, useMemo, useState } from "react";


// TODO: add icons for videos and groups of images to explorations page listings
// TODO: create custom thumbnails and add them with thumbnail:true for a couple of the videos and swipe posts
// TODO: thats it, thats all for explorations!!


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

                  var isGroup = item.imgs ? true : false;

                  item.type = (function() {
                    if (isGroup) {
                      const thumbnailImg = item.imgs.find((img) => img.thumbnail === true);
                      return thumbnailImg ? thumbnailImg.type : item.imgs[0].type;
                    } else {
                      return item.type;
                    }
                  })();
                  
                  item.type = item.type.toLowerCase();
                  var type = IMAGE_TYPES.includes(item.type) ? "image" : "video";

                  var thumb = (function() {
                    if (!isGroup) {
                      return item;
                    } else {
                      const thumbnailImg = item.imgs.find((img) => img.thumbnail === true);
                      return thumbnailImg || item.imgs[0];
                    }
                  })();

                  var img;
                  if (isGroup) {
                    for (var i = 0; i < item.imgs.length; i++) {
                      if (!item.imgs[i].hidden) {
                        img = item.imgs[i];
                        break;
                      }
                    }
                  }
                  img = img || item;
                  

                  return (
                    <Column>
                      <Graphic
                        className="gallery--graphic"
                        type={type}
                        img={thumb}
                        // {...popup}
                        gallery={img}
                        pop={pop}
                      />
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

export default Explorations;
