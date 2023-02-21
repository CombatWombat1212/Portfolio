import { getAdjacentStudy } from "@/scripts/GetStudy";
import Button from "../elements/Buttons";
import Tag from "../elements/Tag";
import { Column } from "../sections/Columns";
import Description from "../sections/Description";
import Graphic from "../sections/Graphic";
import Heading from "../sections/Heading";

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
  return (
    <a className="next-study">
      <div className="next-study--background">
        <Graphic img={study.imgs.main}></Graphic>
      </div>

      <div className="next-study--inner">
        <div className="next-study--body">
          <Copy study={study} />
          <Tags study={study} />
        </div>

        <Button tag="div" type="bottom" className="next-study--button just-bet" icon={["arrow_right", "right", "mask"]} animation="pulse-right">Have a look-see</Button>
      </div>
    </a>
  );
}

function NextStudies({ study }) {
  const first = getAdjacentStudy(study, -1);
  const second = getAdjacentStudy(study, 1);
  // const first = getAdjacentStudy(study, 1);
  // const second = getAdjacentStudy(study, 2);

  var adjacentStudies = [first, second];

  return (
    <div className="next-study--group gap-4 section--wrapper container">
      {adjacentStudies.map((study, index) => (
        <Study study={study} key={study.key} />
      ))}
    </div>
  );
}

export default NextStudies;
