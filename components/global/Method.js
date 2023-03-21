import useOrganizeChildren from "@/scripts/hooks/useOrganizedChildren";
import usePropModifier from "@/scripts/hooks/usePropModifier";
import { Graphic, Heading, Title } from "../sections/Sections";

function Method({ children }) {
  // console.log(children);

  const modChilds = usePropModifier(children, [
    [{ elemType: "Title" }, { className: "" }],
    [{ elemType: "Heading" }, { className: "" }],
    [{ elemType: "p" }, { className: "" }],
    [{ elemType: "Graphic" }, { className: "" }],
  ]);

  const orgChilds = useOrganizeChildren(children, [
    ["title", { elemType: "Title" }, true],
    ["heading", { elemType: "Heading" }, true],
    ["p", { elemType: "p" }, true],
    ["graphic", { elemType: "Graphic" }],
  ]);

  const img = orgChilds.graphic[0].props.img;

  return (
    <>
      <div className="method">
        <Title className="method--title">{orgChilds.title[0]}</Title>
        <div className="method--head">
          <Heading type="h3" className="method--heading">{orgChilds.heading[0]}</Heading>
          <Graphic type="mask" img={img} className="method--mask" />
        </div>
        <div className="method--body">
          <p>{orgChilds.p}</p>
        </div>
      </div>
    </>
  );
}

export default Method;
