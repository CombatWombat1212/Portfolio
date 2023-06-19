import organizeChildren from "@/scripts/organizeChildren";
import usePropModifier from "@/scripts/hooks/usePropModifier";
import { Graphic, Heading, Title } from "../sections/Sections";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { getMirrorStyleProp } from "@/scripts/useMirrorStyle";

function Method(props) {
  const { children } = props;
  // console.log(children);

  const modChilds = usePropModifier(children, [
    [{ elemType: "Title" }, { className: "" }],
    [{ elemType: "Heading" }, { className: "" }],
    [{ elemType: "p" }, { className: "" }],
    [{ elemType: "Graphic" }, { className: "" }],
  ]);

  const orgChilds = organizeChildren(children, [
    ["title", { elemType: "Title" }, true],
    ["heading", { elemType: "Heading" }],
    ["p", { elemType: "p" }, true],
    ["graphic", { elemType: "Graphic" }],
  ]);

  const img = orgChilds.graphic[0].props.img;

  const heading = orgChilds.heading[0].props.children;
  const type = orgChilds.heading[0].props.type;

  const { isBp, loading } = useResponsive();
  const md = isBp("md") && !loading;
  const sm = (isBp("sm") || isBp("xs")) && !loading;
  const desk = !sm && !md;

  return (
    <>
      <div className="method" {...getMirrorStyleProp(props)}>
        <div className="method--inner">
          {sm && <Graphic type="mask" img={img} className="method--mask" />}
          <div className="method--head">
            <div className="meathod--head-inner">
              <Title className="method--title">{orgChilds.title[0]}</Title>
              <Heading type={type} className="method--heading">
                {heading}
              </Heading>
            </div>
            {desk && <Graphic type="mask" img={img} className="method--mask" />}
          </div>

          <div className="method--body">
            <p>{orgChilds.p}</p>
          </div>
        </div>
        {md && <Graphic type="mask" img={img} className="method--mask" />}
      </div>
    </>
  );
}
Method.displayName = "Method";
export default Method;
