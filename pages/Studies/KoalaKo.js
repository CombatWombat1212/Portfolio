import { getStudy } from "@/scripts/GetStudy";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import MAKERIGHT_IMGS from "/data/MAKERIGHT_IMGS";
import Gantt from "/components/charts/Gantt";
import BarGraph from "@/components/charts/BarGraph";
import DLink from "@/components/utilities/DynamicLink";
import PieChart from "@/components/charts/PieChart";
import Button from "@/components/elements/Buttons";
import Slideshow from "@/components/global/slideshow/Slideshow";
import Pitch from "@/components/sections/Pitch";
import { KOALAKO_IMGS } from "@/data/KOALAKO_IMGS";
import ICONS from "@/data/ICONS";
import { MADE_IMGS } from "@/data/MADE_IMGS";
import { STUDY_KOALAKO } from "@/data/CASE_STUDIES";
import { useEffect } from "react";

function KoalaKo({setPopup, onReady}) {
  const study = STUDY_KOALAKO;
  useEffect(() => {
    const handleLoad = () => {
      if (onReady) {
        onReady();
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          handleLoad();
        }
      });
    }

    return () => {
      document.removeEventListener('readystatechange', handleLoad);
    };
  }, []);


  // const colors = [
  //   "#074391",
  //   "#C41263",
  //   "#0A6C4D",
  //   "#CB7C05",
  // ]

  const colors = ["#07418d", "#a91055", "#0a6e4e", "#b56e05"];

  return (
    <CaseStudyPage id={study.id} study={study}>
      <Chapter id="Overview" name="Overview">
        <Section id="Overview--Team" type="columns" titled mainClassName="mt-1 gap-5">
          <Title>The Team</Title>
          <Column>
            <Graphic type="mask" className="b-round" img={ICONS.user} background="background darker" square />
            <Heading type="h3" className="text-align-center graphic--caption">
              Me
            </Heading>
            <Description className="text-align-center mt-1">
              <p>
                UX/UI Design <br />
                Research <br />
                Project Lead
              </p>
            </Description>
          </Column>
          <Column>
            <Graphic type="mask" className="b-round" img={ICONS.user} background="background darker" square />
            <Heading type="h3" className="text-align-center graphic--caption">
              Jianing Li
            </Heading>
            <Description className="text-align-center mt-1">
              <p>
                UX/UI Design <br />
                Research
              </p>
            </Description>
          </Column>

          <Column>
            <Graphic type="mask" className="b-round" img={ICONS.user} background="background darker" square />
            <Heading type="h3" className="text-align-center graphic--caption">
              Marko Prodanovic
            </Heading>
            <Description className="text-align-center mt-1">
              <p>
                UX/UI Design <br />
                Research
              </p>
            </Description>
          </Column>
          <Column>
            <Graphic type="mask" className="b-round" img={ICONS.user} background="background darker" square />
            <Heading type="h3" className="text-align-center graphic--caption">
              Zhiyi Liu
            </Heading>
            <Description className="text-align-center mt-1">
              <p>
                UX/UI Design <br />
                Research
              </p>
            </Description>
          </Column>
        </Section>

        <Section id="Overview--Background" type="overview">
          <Title>Background</Title>
          <Heading>“Creativity is in crisis” - LEGO & AKQA</Heading>
          <Description>
            <p>International design agency AKQA hosts an annual innovation competition called ‘Future Lions’. Partnering with LEGO in 2021, their challenge targeted the growing problem of play being seen as a ‘nice to have.’ Rather than a critical part of a child’s development.</p>
          </Description>

          <Graphic type="mask" img={KOALAKO_IMGS.background_bulb} />
        </Section>

        <Section id="Overview--Challenge" type="overview">
          <Title>Background</Title>
          <Heading>
            Create a digital-age solution that reinforces <br /> the importance of creativity, and play
          </Heading>
          <Description>
            <h3 className="weight-reg mt-2">“No open social platforms. ” - LEGO & AKQA</h3>
            <p className="mt-1">
              Child-focused social media raises many security concerns. <br />
              As well, children already spend countless hours a day on existing platforms.
            </p>
            <h3 className="weight-reg mt-3">Bring play back into the real world</h3>
            <p className="mt-1">Emphasize physical, explorative play</p>
          </Description>

          <Graphic type="mask" img={KOALAKO_IMGS.background_kids} />
        </Section>

        <Section id="Overview--Opporunity">
          <Title>Opportunity</Title>
          <Heading>
            How might my team encourage explorative play <br />
            while following these considerations?
          </Heading>
        </Section>

        <Section id="Overview--Client" type="columns" titled>
          <Title>Solution</Title>
          <Heading>
            KoalaKo, the smart activity database, <br />
            built to help parents help kids
          </Heading>

          <Column>
            <Description className={"text-col-2 mt-3"}>
              <p>This tool offers parents a curated stream of activities for kids of all ages and interests. Thereby easing the parental strain of regularly having to invent new games and types of play.</p>
              <p>It also helps parents foster creative development by encouraging a wide breadth of exploration. Activities range from social to independent, mental to physical, and everything in-between.</p>
            </Description>
            <Graphic type="image" className="b-rad" img={KOALAKO_IMGS.banner_intro} />
          </Column>
        </Section>

        <Section id="Overview--Privacy" type="columns" background="tertiary">
          <Column className="solution--copy">
            <Graphic type="mask" img={KOALAKO_IMGS.solution_personal_info} />
            <Heading>
              No personal information <br />
              about the child
            </Heading>
            <Description>
              <p>Choosing to input your child's age enables KoalaKo's creative development support. Parents can then log a child’s play experiences to receive smart suggestions based on the types of creativity your child is lacking.</p>
              <p>Without this enabled, the app still functions as a browsable activity database. Maintaining its value of being a helping hand to parents who need new ways to keep their children engaged.</p>
            </Description>
          </Column>

          <Column className="solution--graphics">
            <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_setup} lightbox setPopup={setPopup}/>
            <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_skip_signup} lightbox setPopup={setPopup}/>
          </Column>
        </Section>


        <Section id="Overview--Wordly" type="columns" background="tertiary">
          <Column className="solution--graphics">
            <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_location} lightbox setPopup={setPopup}/>
            <Graphic className="b-rad" img={KOALAKO_IMGS.solution_mockup_map_item} lightbox setPopup={setPopup}/>
          </Column>
          <Column className="solution--copy">
            <Graphic type="mask" img={KOALAKO_IMGS.solution_worldly_creativity} />
            <Heading>
            Encourages worldly creativity by providing safe nearby spots to explore
            </Heading>
            <Description>
              <p>Parents can browse locations that match their desired activity, or activities that match a desired location.  Refine these searches with filters for cost, distance from home, and other important factors.  </p>
              <p>This allows KoalaKo to fit any parent's needs.  While still encouraging adventures outside the living room when possible. </p>
            </Description>
          </Column>

        </Section>


        <Section id="Overview--Banner" background={KOALAKO_IMGS.banner_building}>
            <Heading>Building KoalaKo</Heading>
        </Section>


      </Chapter>

      <Chapter name="Closing" id="Closing"></Chapter>
    </CaseStudyPage>
  );
}

export default KoalaKo;
