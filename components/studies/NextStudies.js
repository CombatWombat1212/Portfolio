import toggle from "@/scripts/AnimationTools";
import { getAdjacentStudy } from "@/scripts/GetStudy";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";
import Link from "next/link";
import { useRef } from "react";
import Button from "../elements/Buttons";
import Tag from "../elements/Tag";
import { Column } from "../sections/Columns";
import Description from "../sections/Description";
import Graphic from "../sections/Graphic";
import Heading from "../sections/Heading";

const STUDY_HOVER_AFFECTED = ["next-study", "next-study--button", "graphic--effect__default", "graphic--effect__hover", "next-study--graphic"];

function studyMouseEnter(e, reference) {
  var card = reference.current;

  for (var i = 0; i < STUDY_HOVER_AFFECTED.length; i++) {
    var target;
    if (STUDY_HOVER_AFFECTED[i] == "next-study") target = card;
    else target = card.querySelector(`.${STUDY_HOVER_AFFECTED[i]}`);
    target.classList.add(`hover`);
  }
}

function studyMouseLeave(e, reference) {
  var card = reference.current;
  for (var i = 0; i < STUDY_HOVER_AFFECTED.length; i++) {
    var target;
    if (STUDY_HOVER_AFFECTED[i] == "next-study") target = card;
    else target = card.querySelector(`.${STUDY_HOVER_AFFECTED[i]}`);
    target.classList.remove(`hover`);
  }
}

function Tags({ study }) {
  const hasTags = study.tags?.length > 0;

  return (
    <>
      {hasTags && (
        <div className="next-study--tags">
          {study.tags.map((tag) => (
            <Tag key={tag.key}>{tag.name}</Tag>
          ))}
        </div>
      )}
    </>
  );
}

function Copy({ study }) {
  return (
    <>
      <div className="next-study--copy col-8">
        <Heading className="next-study--title" type="h3">
          {study.name}
        </Heading>
        <Description className="next-study--description">
          <p>{study.subtitle.string}</p>
        </Description>
      </div>
    </>
  );
}

function Study({ study }) {
  const reference = useRef(null);

  return (
    <Link
      ref={reference}
      className="next-study"
      onMouseEnter={(e) => {
        studyMouseEnter(e, reference);
      }}
      onMouseLeave={(e) => {
        studyMouseLeave(e, reference);
      }}
      onFocus={(e) => {
        studyMouseEnter(e, reference);
      }}
      onBlur={(e) => {
        studyMouseLeave(e, reference);
      }}
      tabIndex="0"
        href={study.link}
      >
      <div className="next-study--background">
        <Graphic className="next-study--graphic" img={study.imgs.main} effect="gradient to-left transparent-to-background-darker transparent-to-background-darkest" />
      </div>

      <div className="next-study--inner">
        <div className="next-study--body">
          <Copy study={study} />
          <Tags study={study} />
        </div>

        <Button tag="div" type="bottom" className="next-study--button link" icon={["arrow_right", "right", "mask"]} animation="pulse-right">
          Have a look-see
        </Button>
      </div>
    </Link>
  );
}

function NextStudies({ study }) {
  const first = getAdjacentStudy(study, -1);
  const second = getAdjacentStudy(study, 1);
  // const first = getAdjacentStudy(study, 1);
  // const second = getAdjacentStudy(study, 2);

  var adjacentStudies = [first, second];

  return (
    <div className="next-study--group gap-4">
      {adjacentStudies.map((study, index) => (
        <Study study={study} key={study.key} />
      ))}
    </div>
  );
}

export default NextStudies;
