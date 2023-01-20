//Libraries
// import Image from "next/image";

//Data
import CASE_STUDIES from "/data/CASE_STUDIES";

//Utilities

//Components
import Scrollblock from "/components/global/Scrollblock";
import { Panel, PanelDesc, PanelImg, StudyPanel } from "/components/elements/Panel";
import Mask from "/components/utilities/Mask";

function Index() {
  return (
    <>
      <Scrollblock>
        <Panel id="Home--Hero" type="img-desc">
          <PanelDesc className="col-6">
            <h1 className="section--title">
              Hi, I'm <span className="color--secondary">Sam Giustizia</span>,<br></br>how are you?
            </h1>
            {/* TODO: i really think this should be 2 lines not 3 */}
            <p className="text--h3">
              I'm a multidisciplinary designer,<br></br>
              and a creator of digital solutions,<br></br>
              tailor-fitted to real-world problems.
            </p>
            <p className="text--body">This is my portfolio. Enjoy your stay :)</p>
          </PanelDesc>
          <PanelImg className="col-6">
            <Mask src="/assets/images/flair/Arrow_Squiggle.svg" alt="Squiggly arrow pointing downwards" width={160.42} height={248.06} />
          </PanelImg>
        </Panel>
      </Scrollblock>

      {CASE_STUDIES.map((item) => {
        return (
          <Scrollblock key={item.key}>
            <StudyPanel id={`Home--${item.id}`} key={item.key} variant="home" study={item} />
          </Scrollblock>
        );
      })}
    </>
  );
}

export default Index;
