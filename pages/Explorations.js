import Seo from "@/components/head/Seo";
import Section, { Chapter, Column, Graphic, Heading } from "@/components/sections/Sections";
import { createGraphicClickHandler } from "@/components/sections/graphic/Graphic";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import DLink from "@/components/utilities/DynamicLink";
import { ABOUT_IMGS } from "@/data/ABOUT_IMGS";
import { STUDY_EXPLORATIONS } from "@/data/CASE_STUDIES";
import { EXPLORATIONS_IMGS, EXPLORATIONS_IMG_GROUPS, EXPLORATIONS_ORDER } from "@/data/EXPLORATIONS_IMGS";
import { play, stack } from "@/data/ICONS";
import { IMAGE_TYPES, VIDEO_TYPES, ensureArray, scrollToTarget } from "@/scripts/GlobalUtilities";
import { useIntercept } from "@/scripts/contexts/InterceptContext";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

function getProjectTitle(project) {
  const title =
    project.projectStr ||
    project.project ||
    project.title ||
    (project.imgs && (project.imgs[0].projectStr || project.imgs[0].project)) ||
    (project.imgs && project.imgs[0].title) ||
    project.name;

  return title;
}

function getProjectDescription(project) {
  var val = false;

  const isGroup = Boolean(project.imgs);

  function processDescription(description) {
    let descExists = Boolean(description);
    let descIsNonEmptyString = typeof description === "string" && description.trim() !== "";
    let descIsArrayofNonEmptyStrings =
      Array.isArray(description) && description.every((element) => typeof element === "string" && element.trim() !== "");

    if (descExists && (descIsNonEmptyString || descIsArrayofNonEmptyStrings)) {
      return Array.isArray(description) ? description.join(" ") : description;
    }

    return false;
  }

  const target = isGroup ? project.imgs.find((img) => !img.hidden) || project.imgs[0] : project;
  val = processDescription(target.description) || processDescription(target.alt) || "Gallery image.";

  val = val.trim();
  if (!val.endsWith(".") && !val.endsWith("!") && !val.endsWith("?")) {
    val += ".";
  }

  return val;
}

function getProjectTags(project) {
  var val = "";
  var disciplines = project.disciplines;
  var tools = project.tools;

  var list = [...disciplines, ...tools];

  for (var i = 1; i < list.length; i++) {
    list[i] = ", #" + list[i];
  }

  val = "#" + list.join("");

  return val.trim();
}

function getSeoDescription(title, description, tags) {
  var buffer = 3;
  var val = `${description} ${tags}`.trim();

  // If val's length is greater than 160 characters, cut it and add "..."
  if (val.length > 160) {
    val = val.substring(0, 160 - buffer) + "...";
  }

  val = val.trim();
  if (!val.endsWith(".") && !val.endsWith("!") && !val.endsWith("?")) {
    val += ".";
  }

  return val;
}

function getGalleryProjectSeo(projects) {
  projects.forEach((project) => {
    const title = getProjectTitle(project);
    const description = getProjectDescription(project);
    const tags = getProjectTags(project);

    const seoDescription = getSeoDescription(title, description, tags);

    const seo = {
      title: `Explorations - ${title}`,
      description: seoDescription,
      keywords: `Sam Giustizia, Explorations, Portfolio, Gallery, Project`,
      url: `/Explorations/${project.id}`,
      img: ABOUT_IMGS.me,
    };

    project.seo = seo;
  });

  return projects;
}

function processGalleryContent(images, groups) {
  const ungroupedImages = Object.values(images).filter((img) => !img.group);
  const groupedImages = Object.values(groups);

  const GALLERY_CONTENT = getGalleryProjectSeo(
    [...ungroupedImages, ...groupedImages].map((item) => ({
      ...item,
      drawn: false,
    }))
  );

  return GALLERY_CONTENT;
}

function Explorations({ pop }) {
  const study = STUDY_EXPLORATIONS;

  const disciplines = study.brief.disciplines;

  const GALLERY_CONTENT = processGalleryContent(EXPLORATIONS_IMGS, EXPLORATIONS_IMG_GROUPS);

  const orderedDisciplines = useOrderedDisciplines(disciplines, EXPLORATIONS_ORDER);
  const orderedItems = useOrderedItems(GALLERY_CONTENT, orderedDisciplines, EXPLORATIONS_ORDER);

  const [initialPopShown, setInitialPopShown] = useState(false);

  // const router = useRouter();
  // const [initialPopShown, setInitialPopShown] = useState(false);

  // const { ignore, setIgnore } = useIntercept();

  // useEffect(() => {
  //   setIgnore(true);
  //   console.log("set");
  //   return () => {
  //     setIgnore(false);
  //     console.log("unset");
  //   };
  // }, []);

  // console.log(router);

  // useEffect(() => {
  //   if (!id) return;
  //   const found = GALLERY_CONTENT.find((item) => item.id === id);
  //   if (found) setProject(found);
  // }, [id]);

  const router = useRouter();
  useEffect(() => {
    const project = router.asPath.includes("Explorations?") ? router.asPath.split("=")[1] : false;
    const found = project ? GALLERY_CONTENT.find((item) => item.id === project) : false;
    if (!project || !found || initialPopShown) return;

    setInitialPopShown(true);
    const img = (found.imgs && (found.imgs.find((img) => !img.hidden) || found.imgs[0])) || found;

    setTimeout(() => {
    document.querySelector(`#${img.id}`).scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);

    setTimeout(() => {
    createGraphicClickHandler({ router, lightbox: false, gallery: true, img: img, pop })();
    }, 100);
  }, []);


  return (
    <>
      <Seo page="explorations" />

      <CaseStudyPage id={study.id} study={study}>
        {orderedDisciplines.map((discipline) => {
          // const orderedItems = useOrderedItems(GALLERY_CONTENT, discipline.name, EXPLORATIONS_ORDER);
          const disciplineItems = orderedItems[discipline.name];

          return (
            <Chapter key={discipline.name} id={discipline.name.replace(" ", "-")} name={discipline.name}>
              <Section id={`${discipline.name}--Section`} className="gallery--section" mainType="grid" background="none">
                <Heading>{discipline.displayName}</Heading>
                {...disciplineItems.map((item) => {
                  if (item.drawn) return;
                  item.drawn = true;

                  const { isGroup, type, isVideo, isStack, img, thumb } = getMediaDetails({ item }, { onlyFirst: true });

                  return (
                    <Column key={img.src} className={"gallery--column"}>
                      <Graphic
                        className="gallery--graphic"
                        type={type}
                        img={thumb}
                        // {...popup}
                        gallery={img}
                        pop={pop}
                        id={img.id}
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
        <Chapter id="Closing" name="Closing"></Chapter>
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
