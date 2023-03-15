//Libraries
// import Image from "next/image";

//Data
import CASE_STUDIES from "/data/CASE_STUDIES";

//Utilities

//Components
import Scrollblock from "/components/global/Scrollblock";
import { Panel, PanelDesc, PanelImg, StudyPanel } from "@/components/elements/Panel";
import Mask from "/components/utilities/Mask";
import { useEffect, useState } from "react";
import { useMountEffect } from "@/scripts/hooks/useMountEffect";

function Index() {

  // TODO: Randomize the text on the buttons with a few funny different ones, like take a gander, have a look-see check it out, or just check-it, etc.


  const captions = [
    "Have a look-see",
    "Take a gander",
    "Check it",
    "I must know",
    "Gimme",
    "Go on...",
  ];
    
  const [chosen, setChosen] = useState([]);
  
  const getRandomUniqueCaptions = (captions, obj) => {
    var count = obj.length;
    if (count > captions.length) {
      throw new Error("count should be less than or equal to the number of captions");
    }
    const shuffledCaptions = [...captions].sort(() => 0.5 - Math.random());
    return shuffledCaptions.slice(0, count);
  };
  
  useMountEffect(() => {
    setChosen(getRandomUniqueCaptions(captions, CASE_STUDIES));
  }, []);

  

  return (
    <>
      <Scrollblock>
        <Panel id="Home--Hero" type="img-desc">
          <PanelDesc className="col-6">
            <h1 className="panel--title">
              Hi, I&apos;m <span className="color--secondary">Sam Giustizia</span>,<br />how are you?
            </h1>
            {/* TODO: i really think this should be 2 lines not 3.  More about length than of element size, i think you can trim it a bit */}
            <p className="text--h3">
              I&apos;m a multidisciplinary designer,<br />
              and a creator of digital solutions,<br />
              tailor-fitted to real-world problems.
            </p>
            <p className="text--body">This is my portfolio. Enjoy your stay :)</p>
          </PanelDesc>
          <PanelImg className="col-6">
            {/* TODO: fix now that i know what the standard is here */}
            <Mask src="/assets/images/flair/Arrow_Squiggle.svg" alt="Squiggly arrow pointing downwards" width={160.42} height={248.06} />
          </PanelImg>
        </Panel>
      </Scrollblock>

      {CASE_STUDIES.map((item) => {
        var caption = chosen[CASE_STUDIES.indexOf(item)];
        return (
          <Scrollblock key={item.key}>
            <StudyPanel id={`Home--${item.id}`} key={item.key} variant="home" study={item} button={caption}/>
          </Scrollblock>
        );
      })}
    </>
  );
}

export default Index;
