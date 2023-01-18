import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

import CASE_STUDIES from "/data/CASE_STUDIES";

import Scrollblock from "/components/global/Scrollblock";
import { Panel, PanelDesc, PanelImg } from "/components/Elements/Panel";
import Button from "/components/Elements/Buttons";

function Index() {
  return (
    <>
      <Scrollblock>
        <Panel id="Home--Hero" type="img-desc">
          <PanelDesc className="col-6">
            <h1 className="section--title">
              Hi, I'm <span className="color--secondary">Sam Giustizia</span>,<br></br>how are you?
            </h1>
            <p className="text--h3">
              I'm a multidisciplinary designer,<br></br>
              and a creator of digital solutions,<br></br>
              tailor-fitted to real-world problems.
            </p>
            <p className="text--body">This is my portfolio. Enjoy your stay :)</p>
          </PanelDesc>
          <PanelImg className="col-6">
            {/* TODO: fix the pixelated look of this img */}
            <Image src="/assets/images/flair/Arrow_Squiggle.png" alt="Squiggly arrow pointing downwards" width={651} height={1003} />
          </PanelImg>
        </Panel>
      </Scrollblock>

      {CASE_STUDIES.map((item) => {
        return (
          <Scrollblock key={uuidv4()}>
            <Panel id={`Home--${item.id}`} key={item.key}>
              <PanelDesc>
                <h2>{item.name}</h2>
                <h3>{item.description.jsx}</h3>
                <div className="section--tags"></div>
                <Button type="regular" icon={["arrow_right", "right", 'mask']}>
                  Have a look see
                </Button>
              </PanelDesc>
              <PanelImg className="col-6">
                <Image src={item.img.src} alt={item.img.alt} width={item.img.width} height={item.img.height} />
              </PanelImg>
            </Panel>
          </Scrollblock>
        );
      })}
    </>
  );
}

export default Index;
