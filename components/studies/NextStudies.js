import toggle from "@/scripts/AnimationTools";
import { getAdjacentStudy, getStudy } from "@/scripts/GetStudy";
import { Fragment, useRef } from "react";
import Button from "../elements/Buttons";
import Tag from "../elements/Tag";
import { Column } from "../sections/Columns";
import Description from "../sections/Description";
import Graphic from "../sections/graphic/Graphic";
import Heading from "../sections/Heading";
import { useResponsiveUtils } from "@/scripts/hooks/useBreakpoint";
import { arrow_left, arrow_right } from "@/data/ICONS";
import DLink from "../utilities/DynamicLink";
import useRandomString from "@/scripts/hooks/useRandomString";
import Section from "../sections/Sections";
import { v4 as uuidv4 } from "uuid";
import Nobr from "../utilities/Nobr";

const STUDY_HOVER_AFFECTED = ["next-study", "next-study--button", "graphic--effect__default", "graphic--effect__hover", "next-study--graphic", "tag"];

function studyMouseEnter(e, reference) {
  var card = reference.current;

  for (var i = 0; i < STUDY_HOVER_AFFECTED.length; i++) {
    var targets;
    if (STUDY_HOVER_AFFECTED[i] == "next-study") targets = [card];
    else targets = card.querySelectorAll(`.${STUDY_HOVER_AFFECTED[i]}`);
    targets.forEach((target) => target.classList.add(`hover`));
  }
}

function studyMouseLeave(e, reference) {
  var card = reference.current;
  for (var i = 0; i < STUDY_HOVER_AFFECTED.length; i++) {
    var targets;
    if (STUDY_HOVER_AFFECTED[i] == "next-study") targets = [card];
    else targets = card.querySelectorAll(`.${STUDY_HOVER_AFFECTED[i]}`);
    targets.forEach((target) => target.classList.remove(`hover`));
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
      <div className="next-study--copy col-8 col-xl-10 col-lg-12">
        <Graphic className="next-study--graphic next-study--graphic__mobile d-md-flex d-none" img={study.imgs.main} />
        <Heading className="next-study--title" type="h3">
          {study.name}
        </Heading>
        <Description className="next-study--description">
          <p>{study.subtitle.nextStudyJsx || study.subtitle.string}</p>
        </Description>
      </div>
    </>
  );
}

function Study({ study, button, index }) {
  const reference = useRef(null);

  const handleMouseEnter = (e) => {
    studyMouseEnter(e, reference);
  };

  const handleMouseLeave = (e) => {
    studyMouseLeave(e, reference);
  };

  const { isBpAndDown, loading } = useResponsiveUtils();

  const btnIcon = (() => {
    let direction = "arrow_right";
    if (!loading && isBpAndDown("sm") && index === 0) {
      direction = "arrow_left";
    }
    return direction;
  })();

  const btnIconSide = (() => {
    let direction = "right";
    if (!loading && isBpAndDown("sm")) {
      direction = index === 0 ? "left" : "right";
    }
    return direction;
  })();

  const btnText = (() => {
    let text = button;
    if (!loading && isBpAndDown("sm")) {
      text = study.name == "Made Clothing Co." ? "Made" : study.name;
    }
    return text;
  })();

  return (
    <DLink
      reference={reference}
      className="next-study"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex="0"
      href={study.link}>
      <div className="next-study--background">
        <Graphic
          className="next-study--graphic next-study--graphic__main d-md-none"
          img={study.imgs.main}
          effect="gradient to-left transparent-to-background-darker transparent-to-background-darkest"
        />
      </div>

      <div className="next-study--inner">
        <div className="next-study--body">
          <Copy study={study} />
          {/* <Tags study={study} /> */}
        </div>

        <Button
          tag="div"
          type="bottom"
          className={`next-study--button next-study--button__${btnIconSide} link`}
          icon={[btnIcon, btnIconSide, "mask"]}
          animation={`pulse-${btnIconSide}`}>
          {btnText}
        </Button>
      </div>
    </DLink>
  );
}

function NextStudies({ study }) {
  const first = getAdjacentStudy(study, -1);
  const second = getAdjacentStudy(study, 1);

  var adjacentStudies = [first, second];

  const captions = ["Check it", "Gimme", "I'll bite", "Ouu", "Do tell", "Go on..."];
  const chosen = useRandomString(captions, { localStorage: true, key: "next-study--caption", count: 2 });

  return (
    <div className="next-study--group">
      {adjacentStudies.map((study, index) => (
        <Study study={study} key={study.key} button={chosen[index]} index={index} />
      ))}
    </div>
  );
}


function Next({ study }) {



  const captions = [
    "Room for one more?",
    "Case studies, anyone?",
    "Another one.",
    <Fragment key={uuidv4()}>Let&rsquo;s keep the good times rollin&rsquo;</Fragment>,
    <Fragment key={uuidv4()}>There&rsquo;s more <Nobr>where that came from</Nobr></Fragment>,
    <Fragment key={uuidv4()}>Get &rsquo;em while <Nobr>they&rsquo;re hot</Nobr></Fragment>,
    <Fragment key={uuidv4()}>We&rsquo;re just gettin&rsquo; started</Fragment>,
  ];

  const nextStudyTitle = useRandomString(captions, { localStorage: true, key: "next--title" });

  return (
    <Section id="Closing--Next" type="passthrough" wrapperClassName={"pb-section-gap"} titled>
      <Heading>{nextStudyTitle}</Heading>
      <NextStudies study={study} />
    </Section>
  );
}



export default NextStudies;

export { Next };