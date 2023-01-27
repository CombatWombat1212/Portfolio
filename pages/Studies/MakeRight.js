import { StudyPanel } from "/components/elements/Panel";
import getStudy from "../../scripts/GetStudy";
import CaseStudyPage from "/components/studies/CaseStudyPage";
import Brief from "/components/studies/Brief";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, GraphicGroup } from "/components/studies/Sections";
import MAKERIGHT_IMGS from "/data/MAKERIGHT_IMGS";
import Gantt from "/components/charts/Gantt";

// TODO:add the interactive chapter selection thingy

function MakeRight() {
  const study = getStudy();

  return (
    <>
      <CaseStudyPage id={study.id}>
        <StudyPanel variant="study" study={study} />

        <Brief brief={study.brief} />

        <Chapter name="Overview">
          <Section id="Overview" type="overview">
            <Title>Background</Title>
            <Heading>3D printing is yet to reach its full potential</Heading>
            <Description>
              <p>
                Offering endless customization, cheap manufacturing, and fast production speeds.
                <br />
                3D printing has a vast potential to benefit everyday consumers.
              </p>
              <p>In the early 2010s, we were told they would be found in every home; giving consumer’s the power to create anything. But its barriers were too great to reach these expectations, and this reality fell flat. Now, 3D printing hardly has any impact on the average consumer’s life.</p>
            </Description>

            <Graphic type="image" img={MAKERIGHT_IMGS["full_potential"]} />
          </Section>

          <Section id="Challenge" type="overview">
            <Title>Challenge</Title>
            <Heading>
              Cost, and technical knowledge
              <br />
              stand in the way of mass adoption
            </Heading>
            <Description>
              <p>Owning a 3D printer is a steep upfront investment, and learning to use it is a massive time sink. Even then, users without 3D modelling experience will still be restricted to making premade objects.</p>
              <p>There needs to be a way to eliminate these barriers so that 3D printing can reach its full potential. Allowing average consumers to access the benefits of the technology.</p>
            </Description>

            <Graphic type="image" img={MAKERIGHT_IMGS["barriers_to_entry"]} />
          </Section>

          <Section id="Opportunity">
            <Title>Opportunity</Title>
            <Heading>How might we remove these barriers, and translate the benefits of 3D printing to the average consumer?</Heading>
          </Section>
        </Chapter>

        <Chapter name="Pitch" id="Pitch" background="makeright tertiary">
          <Section id="HeroLogo" type="logo banner" background="primary" align="just-center">
            <Graphic type="mask" img={MAKERIGHT_IMGS["makeright_logo"]} />
          </Section>

          <Section id="IntroSolution" background="background">
            <Title>Solution</Title>
            <Heading>
              Directly connect consumers with owners of 3D printers
              <br />
              for stress-free, low-cost production.
            </Heading>
          </Section>

          {/* TODO: go back and add the scrolling animations and fancy engineering planned for this section */}

          <Section id="Pitch--Choose" type="pitch" margin="wide">
            <Heading>Choose</Heading>
            <Description>
              from our collection <br />
              of sourced 3D models,
              <br /> or upload your own
            </Description>
            <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_choose"]} />
            <Graphic type="image" img={MAKERIGHT_IMGS["pitch_laptop_choose"]} />
          </Section>

          <Section id="Pitch--Tweak" type="pitch" margin="wide">
            <Heading>Tweak</Heading>
            <Description>
              and personalize
              <br />
              to suit your needs
            </Description>
            <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_tweak"]} />
            <Graphic type="image" img={MAKERIGHT_IMGS["pitch_laptop_tweak"]} />
          </Section>

          <Section id="Pitch--Order" type="pitch" margin="wide">
            <Heading>Order</Heading>
            <Description>
              your model, assigning it <br />
              to one of our verified makers
            </Description>
            <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_order"]} />
            <Graphic type="image" img={MAKERIGHT_IMGS["pitch_laptop_order"]} />
          </Section>

          <Section id="Pitch--Recieve" type="pitch" margin="wide">
            <Heading>Recieve</Heading>
            <Description>right at your front door</Description>
            <Graphic type="mask" img={MAKERIGHT_IMGS["pitch_recieve"]} />
            <Graphic type="image" img={MAKERIGHT_IMGS["pitch_laptop_recieve"]} />
          </Section>

          <Section id="IntroSummary" type="columns" background="background">
            <Column>
              <Heading type="h3">Slashing the overhead of competitors</Heading>
              <Description>
                <p>Competing services ruin the low-cost benefits of 3D printing by charging steep overhead fees. Created by having countless technicians and printers operating under one roof.</p>
                <p>MakeRight undercuts this overhead by connecting customers directly to makers. Only charging them for the work of one technician, paid to run their own equipment.</p>
              </Description>
            </Column>
            <Column>
              <Heading type="h3">
                Operating much like an 'Uber'
                <br />
                for 3D prints from local makers.
              </Heading>
              <Description>
                <p>Giving customers access to 3D printing's low-cost, customizable production, without owning or operating the technology. While also enabling hobbyist makers to profit off their skills and equipment. </p>
              </Description>
            </Column>
          </Section>
        </Chapter>

        <Chapter name="Plan" id="Plan">
          <Section id="BuildingMakeRight" background={MAKERIGHT_IMGS["building_makeright_banner"]}>
            <Heading>Building MakeRight</Heading>
          </Section>

          <Section id="Plan--Gantt" className="flex-col">
            <Title>Project Plan</Title>
            <Heading>Project phases and timeline</Heading>
            <Gantt study="MakeRight" />
          </Section>
        </Chapter>

        <Chapter name="Research" id="Research">
          <Section type="columns" className="flex-col" titled arrows background="background darker">
            <Title>Approach</Title>
            <Heading>Finding a focus within the field of 3D printing</Heading>
            {/* TODO: give something the ability to put arrows between each column */}
            {/* good morning man<3 i hope you had a great weekend and you're ready for a fresh new start!! you're going to fucking kill it this week.  i love you.  your first challenge is the arrows between the graphics thing.  what made it so hard is vertically centering it when you don't know the height of the images.  maybe you could wrap the images in something that has a definite height? just a thought, theres loads of ways to do it and i know you'll find one that works for your needs <3.  you did amazing last week and i cant wait to see what you accomplish next.  good luck today:)  */}

            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["secondary_research"]} />
              <Description type="h3" className="graphic--caption">
                <b>Secondary research</b> to understand a high level context of the 3D printing world
              </Description>
            </Column>
            <Column>
              <Graphic type="mask" background="background" img={MAKERIGHT_IMGS["interviews"]} />
              <Description type="h3" className="graphic--caption">
                <b>Interviews & surveys</b> to understand peoples’ experiences at a lower level
              </Description>
            </Column>
          </Section>
        </Chapter>
      </CaseStudyPage>
    </>
  );
}

export default MakeRight;
