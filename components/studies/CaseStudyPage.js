import { StudyPanel } from "../elements/Panel";
import Section, { Heading } from "../sections/Sections";
import Brief from "./Brief";
import NextStudies, { Next } from "./NextStudies";
import Indicator from "./Indicator";
import React, { useEffect, useLayoutEffect, useState } from "react";
import useRandomString from "@/scripts/hooks/useRandomString";
import { useAnchoredArrowsInit, re, useAnchoredArrowsInitmoveExcessArrows } from "../sections/sections_utilities/ArrowUtilities";
import { useColLine } from "../sections/sections_utilities/ColLineUtilities";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import useMirrorStyle from "@/scripts/useMirrorStyle";

// function insertNextElementAfterLastSection(newChildren, lastChapterIndex, lastChapterChildren) {
//   if (lastChapterChildren[0] == undefined && lastChapterChildren.length == 1) lastChapterChildren = [<></>];

//   var lastSectionIndex = lastChapterChildren.findIndex((child) => child.type.name === "Section" || child.type.displayName === "Section");

//   // If a "Section" was found within the last chapter, insert the "Next" element after it
//   if (lastSectionIndex !== -1) {
//     const nextElementIndex = newChildren.findIndex((child) => child.type.name === "Next" || child.type.displayName === "Next");
//     if (nextElementIndex !== -1) {
//       const nextElement = newChildren.splice(nextElementIndex, 1)[0];
//       const lastChapter = newChildren[lastChapterIndex];
//       const newLastChapter = { ...lastChapter, props: { ...lastChapter.props, children: lastChapterChildren } };
//       newLastChapter.props.children.splice(lastSectionIndex + 1, 0, nextElement);
//       newChildren[lastChapterIndex] = newLastChapter;
//     }
//   }
// }

// function processChildren(children) {
//   var newChildren = React.Children.toArray(children);
//   if (!Array.isArray(newChildren)) newChildren = [newChildren];

//   var lastChapterIndex = -1;
//   for (let i = newChildren.length - 1; i >= 0; i--) {
//     if (newChildren[i].type.name === "Chapter" || newChildren[i].type.displayName === "Chapter") {
//       lastChapterIndex = i;
//       break;
//     }
//   }

//   if (lastChapterIndex !== -1) {
//     const lastChapter = newChildren[lastChapterIndex];
//     const lastChapterChildren = Array.isArray(lastChapter.props.children) ? lastChapter.props.children : [lastChapter.props.children];
//     // insertNextElementAfterLastSection(newChildren, lastChapterIndex, lastChapterChildren);
//   }

//   return newChildren;
// }

function StudyWrapper({ id, study, children }) {
  // const [processedChildren, setProcessedChildren] = useState(children);
  const [hasColLine, setHasColLine] = useState(false);

  const newChildren = (() => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      if (child.type.name !== "Chapter" && child.type.displayName !== "Chapter") return child;
      return React.cloneElement(child, { study: study });
    });
  })();

  useEffect(() => {
    if (!newChildren) return;
    const line = newChildren.some((child) => {
      if (!child?.type?.name === "Chapter" && !child?.type?.displayName === "Chapter") return false;
      if (!child.props?.children) return false;
      const chapterChildren = Array.isArray(child.props.children) ? child.props.children : [child.props.children];
      if (chapterChildren.length === 0 || chapterChildren[0] == undefined) return false;
      return chapterChildren.some(
        (chapterChild) => (chapterChild.type.name === "Section" || chapterChild.type.displayName === "Section") && chapterChild.props.line
      );
    });
    setHasColLine(line);
  }, [children]);

  const { bp, loading } = useResponsive();

  useAnchoredArrowsInit(newChildren, { update: [bp, loading], timeout: 500 });

  useMirrorStyle();

  return (
    <div id={id} className="casestudy">
      <ColLineInit hasColLine={hasColLine} />
      <Indicator />
      <StudyPanel variant={"study"} study={study} />
      <Brief study={study} />
      {newChildren}
    </div>
  );
}

function CaseStudyPage({ id, study, children }) {
  return (
    <StudyWrapper id={id} study={study}>
      {children}
      {/* <Next study={study} /> */}
    </StudyWrapper>
  );
}

function ColLineInit({ hasColLine }) {
  const { bp } = useResponsive();
  useColLine(hasColLine, { update: [bp] });
}

export default CaseStudyPage;
