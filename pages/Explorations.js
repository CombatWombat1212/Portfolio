import Section, { Chapter, Column, Graphic, Heading } from "@/components/sections/Sections";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { STUDY_EXPLORATIONS } from "@/data/CASE_STUDIES";
import { EXPLORATIONS_IMGS, EXPLORATIONS_IMG_GROUPS, EXPLORATIONS_ORDER } from "@/data/EXPLORATIONS_IMGS";
import { IMAGE_TYPES, VIDEO_TYPES, ensureArray } from "@/scripts/GlobalUtilities";
import { useEffect, useMemo, useState } from "react";

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



  return (
    <>
      <CaseStudyPage id={study.id} study={study}>
        {orderedDisciplines.map((discipline) => {

          const orderedItems = useOrderedItems(GALLERY_CONTENT, discipline.name, EXPLORATIONS_ORDER);

          return (
            <Chapter key={discipline.name} id={discipline.name} name={discipline.name}>
              <Section id={`${discipline.name}--Section`} className="gallery--section" mainType="grid">
                <Heading>{discipline.displayName}</Heading>
                {...orderedItems.map((item) => {
                  if (item.drawn) return;
                  item.drawn = true;

                  var isGroup = item.imgs ? true : false;

                  if (isGroup) item.type = item.imgs[0].type;

                  item.type = item.type.toLowerCase();
                  var type = IMAGE_TYPES.includes(item.type) ? "image" : "video";

                  var img = isGroup ? item.imgs[0] : item;

                  // console.log(item);

                  return (
                    <Column>
                      <Graphic
                        className="gallery--graphic"
                        type={type}
                        img={img}
                        // {...popup}
                        gallery
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

function useOrderedItems(items, disciplineName, explorationsOrder) {
  return useMemo(() => {
    const itemsWithDiscipline = items.filter((item) => item.disciplines.includes(disciplineName));

    const orderItems = (items, order) => {
      const orderedItems = [];
      const unorderedItems = [];

      Object.entries(order).forEach(([discipline, disciplineInfo]) => {
        const { projects } = disciplineInfo;
        const disciplineItems = [];

        projects.forEach((project) => {
          const foundItem = items.find((item) => item.name === project);

          if (foundItem) {
            disciplineItems.push(foundItem);
          }
        });

        const notMatchedItems = items.filter((item) => item.disciplines.includes(discipline) && !disciplineItems.includes(item));
        unorderedItems.push(...notMatchedItems);
        orderedItems.push(...disciplineItems);
      });

      return [...orderedItems, ...unorderedItems];
    };

    return orderItems(itemsWithDiscipline, explorationsOrder);
  }, [items, disciplineName, explorationsOrder]);
}



export default Explorations;
