import { StudyPanel } from "/components/elements/Panel";
import getStudy from "../../scripts/GetStudy";
import CaseStudyPage from "/components/studies/CaseStudyPage";
import Brief from "/components/studies/Brief";
import { Section, Chapter, Title, Column, Heading, Description, Graphic } from "/components/studies/Sections";
import MAKERIGHT_IMGS from "/data/MAKERIGHT_IMGS";
import Gantt from "/components/studies/Gantt";

// TODO:add the interactive chapter selection thingy

function MakeRight() {
  const study = getStudy();

  return (
    <>
      <CaseStudyPage id={study.id}>
        <StudyPanel variant="study" study={study} />

        <Brief brief={study.brief} />

        <Chapter name="overview">
          <Section id="Background" type="background">
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

          <Section id="Challenge" type="background">
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


            {/* TODO: morning man! before getting started on the gantt chart, do what you did to the pitch icons to the graphics at the top of the page to ensure that they're always at the right scale.  This will require you to create an image wrapper of somekind, or figure out how to make changes to the next/image one, because you need to have a way to add width and height css variables to each image automaticalls */}

            <Heading>Building MakeRight</Heading>
            <Gantt />
          </Section>


        </Chapter>
      </CaseStudyPage>
    </>
  );
}

export default MakeRight;
