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
import { toTitleCase } from "@/scripts/GlobalUtilities";

function Explorations({ setPopup }) {
  const study = STUDY_EXPLORATIONS;

  var disciplines = study.brief.disciplines;

  // EXPLORATIONS_IMGS is an array of objects, each with one image, and a list of disciplines and tools, and some have a 'group' property.
  // EXPLORATIONS_IMG_GROUPS is an object with keys that are the group names, and values that are arrays of image objects.
  // I want gallery content to be a list which contains all of the groups of images, and all of the images that don't have a group.
  // both images and groups have a 'disciplines', and 'tools' property, which is an array of strings.
  //for groups it refers to all the disciplines and tools of the images in the group.
  // const GALLERY_CONTENT =

  const ungroupedImages = Object.values(EXPLORATIONS_IMGS).filter(
    (img) => !img.group
  );
  const groupedImages = Object.values(EXPLORATIONS_IMG_GROUPS);

  const GALLERY_CONTENT = [...ungroupedImages, ...groupedImages];

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
                {...itemsWithDiscipline.map((item) => (
                  // TODO: finish styling the brief tag and discipline header thing
                  // TODO: add cases for groups, images, videos, videos in groups with images that can be a thumbnail, and videos in groups without images.
                  // then obviously styling and adding the popup and etc etc
                  // then we'll also need cases for ways of easily ordering content
                  // then filtering
                  <Column>
                    <Graphic type="image" img={item.imgs ? item.imgs[0] : item}></Graphic>
                  </Column>
                ))}
              </Section>
            </Chapter>
          );
        })}
      </CaseStudyPage>
    </>
  );
}
export default Explorations;
