import { StudyPanel } from "../elements/Panel";
import Section, { Heading } from "../sections/Sections";
import Brief from "./Brief";
import NextStudies from "./NextStudies";
import Indicator from "./Indicator";
import React, { useEffect, useState } from "react";
import useRandomString from "@/scripts/hooks/useRandomString";
import { useAnchoredArrowsInit, re, useAnchoredArrowsInitmoveExcessArrows } from "../sections/sections_utilities/ArrowUtilities";
import { useColLine } from "../sections/sections_utilities/ColLineUtilities";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import useMirrorStyle from "@/scripts/useMirrorStyle";

function insertNextElementAfterLastSection(newChildren, lastChapterIndex, lastChapterChildren) {
  if (lastChapterChildren[0] == undefined && lastChapterChildren.length == 1) lastChapterChildren = [<></>];

  var lastSectionIndex = lastChapterChildren.findIndex((child) => child.type.name === "Section" || child.type.displayName === "Section");

  // If a "Section" was found within the last chapter, insert the "Next" element after it
  if (lastSectionIndex !== -1) {
    const nextElementIndex = newChildren.findIndex((child) => child.type.name === "Next" || child.type.displayName === "Next");
    if (nextElementIndex !== -1) {
      const nextElement = newChildren.splice(nextElementIndex, 1)[0];
      const lastChapter = newChildren[lastChapterIndex];
      const newLastChapter = { ...lastChapter, props: { ...lastChapter.props, children: lastChapterChildren } };
      newLastChapter.props.children.splice(lastSectionIndex + 1, 0, nextElement);
      newChildren[lastChapterIndex] = newLastChapter;
    }
  }
}

function StudyWrapper({ id, study, children }) {
  const [processedChildren, setProcessedChildren] = useState(null);
  const [hasColLine, setHasColLine] = useState(false);

  useEffect(() => {
    var newChildren = React.Children.toArray(children);
    if (!Array.isArray(newChildren)) newChildren = [newChildren];

    var lastChapterIndex = -1;
    for (let i = newChildren.length - 1; i >= 0; i--) {
      if (newChildren[i].type.name === "Chapter" || newChildren[i].type.displayName === "Chapter") {
        lastChapterIndex = i;
        break;
      }
    }

    if (lastChapterIndex !== -1) {
      const lastChapter = newChildren[lastChapterIndex];
      const lastChapterChildren = Array.isArray(lastChapter.props.children) ? lastChapter.props.children : [lastChapter.props.children];
      insertNextElementAfterLastSection(newChildren, lastChapterIndex, lastChapterChildren);
    }

    setProcessedChildren(newChildren);
  }, [children]);

  useEffect(() => {
    if (!processedChildren) return;
    const line = processedChildren.some((child) => {
      if (!child.type.name === "Chapter" && !child.type.displayName === "Chapter") return false;
      const chapterChildren = Array.isArray(child.props.children) ? child.props.children : [child.props.children];
      if (chapterChildren.length === 0 || chapterChildren[0] == undefined) return false;
      return chapterChildren.some(
        (chapterChild) => (chapterChild.type.name === "Section" || chapterChild.type.displayName === "Section") && chapterChild.props.line
      );
    });
    setHasColLine(line);
  }, [processedChildren]);

  const { bp, loading } = useResponsive();

  useAnchoredArrowsInit(processedChildren, { update: [bp, loading], timeout: 500 });

  useMirrorStyle();

  return (
    <div id={id} className="casestudy">
      <ColLineInit hasColLine={hasColLine} />
      <Indicator />
      <StudyPanel variant={"study"} study={study} />
      <Brief study={study} />
      {processedChildren}
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
  const captions = [
    "Room for one more?",
    "Case studies, anyone?",
    "Lets keep the good times rollin'",
    "Another one.",
    "There's more where that came from",
    "Get 'em while they're hot",
    "We're just gettin' started",
  ];

  const nextStudyTitle = useRandomString(captions, { localStorage: true, key: "next--title" });

  return (
    <Section id="Closing--Next" type="passthrough" wrapperClassName={"pb-section-gap"} titled>
      <Heading>{nextStudyTitle}</Heading>
      <NextStudies study={study} />
    </Section>
  );
}

function ColLineInit({ hasColLine }) {
  const { bp } = useResponsive();
  useColLine(hasColLine, { update: [bp] });
}

export default CaseStudyPage;
