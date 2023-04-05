import Section, {
  Chapter,
  Column,
  Graphic,
  Heading,
} from "@/components/sections/Sections";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { STUDY_EXPLORATIONS } from "@/data/CASE_STUDIES";
import {
  EXPLORATIONS_IMGS,
  EXPLORATIONS_IMG_GROUPS,
} from "@/data/EXPLORATIONS_IMGS";
import { IMAGE_TYPES, VIDEO_TYPES, ensureArray } from "@/scripts/GlobalUtilities";




function Explorations({ pop }) {
  const study = STUDY_EXPLORATIONS;

  var disciplines = study.brief.disciplines;

  const ungroupedImages = Object.values(EXPLORATIONS_IMGS).filter(
    (img) => !img.group
  );
  const groupedImages = Object.values(EXPLORATIONS_IMG_GROUPS);

  const GALLERY_CONTENT = [...ungroupedImages, ...groupedImages].map(item => ({
    ...item,
    drawn: false,
  }));


  return (
    <>
      <CaseStudyPage id={study.id} study={study}>
        {disciplines.map((discipline) => {
          const itemsWithDiscipline = GALLERY_CONTENT.filter((item) =>
            item.disciplines.includes(discipline.name)
          );

          return (
            <Chapter
              key={discipline.name}
              id={discipline.name}
              name={discipline.name}>
              <Section
                id={`${discipline.name}--Section`}
                className="gallery--section"
                mainType="grid">
                <Heading>{discipline.displayName}</Heading>
                {...itemsWithDiscipline.map((item) => {


                  if (item.drawn) return;
                  item.drawn = true;

                  var isGroup = item.imgs ? true : false;

                  if(isGroup)item.type = item.imgs[0].type;
                  
                  item.type = item.type.toLowerCase();
                  var type = IMAGE_TYPES.includes(item.type) ? "image" : "video";

                  var img = isGroup ? item.imgs[0] : item;


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
export default Explorations;
