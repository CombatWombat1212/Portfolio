import { StudyPanel } from "../elements/Panel";
import Section from "../sections/Sections";
import Brief from "./Brief";
import NextStudies from "./NextStudies";
import Indicator from "./Indicator";
import React from "react";



function insertNextElementAfterLastSection(newChildren, lastChapterIndex, lastChapterChildren) {
  const lastSectionIndex = lastChapterChildren.findIndex(child => child.type.name === "Section");

  // If a "Section" was found within the last chapter, insert the "Next" element after it
  if (lastSectionIndex !== -1) {
    const nextElementIndex = newChildren.findIndex(child => child.type.name === "Next");
    if (nextElementIndex !== -1) {
      const nextElement = newChildren.splice(nextElementIndex, 1)[0];
      const lastChapter = newChildren[lastChapterIndex];
      const newLastChapter = {...lastChapter, props: {...lastChapter.props, children: lastChapterChildren}};
      newLastChapter.props.children.splice(lastSectionIndex + 1, 0, nextElement);
      newChildren[lastChapterIndex] = newLastChapter;
    }
  }
}




function StudyWrapper({ id, study, children }) {
  var newChildren = React.Children.toArray(children);
  if (!Array.isArray(newChildren)) newChildren = [newChildren];

  // Find the index of the last chapter within newChildren
  let lastChapterIndex = -1;
  for (let i = newChildren.length - 1; i >= 0; i--) {
    if (newChildren[i].type.name === "Chapter") {
      lastChapterIndex = i;
      break;
    }
  }

  // If a chapter was found, check if the last child of the last chapter is a "Section"
  if (lastChapterIndex !== -1) {
    const lastChapter = newChildren[lastChapterIndex];
    const lastChapterChildren = Array.isArray(lastChapter.props.children) ? lastChapter.props.children : [lastChapter.props.children];
    insertNextElementAfterLastSection(newChildren, lastChapterIndex, lastChapterChildren);
  }
  
  return (
    <div id={id} className="casestudy">
      <Indicator />
      <StudyPanel variant="study" study={study} />
      <Brief brief={study.brief} />
      {newChildren}
    </div>
  );
}

function CaseStudyPage({ id, study, children }) {
  return (
    <StudyWrapper id={id} study={study}>
      {children}
      <Next study={study} />
    </StudyWrapper>
  );
}


function Next({ study }) {
  return (
    <Section id="Closing--Next" type="passthrough" wrapperClassName={'pb-section-gap'}>
      <NextStudies study={study} />
    </Section>
  );
}

export default CaseStudyPage;
