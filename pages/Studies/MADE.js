import { getStudy } from "@/scripts/GetStudy";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import { MADE_IMGS, MADE_IMG_GROUPS } from "@/data/MADE_IMGS";
import MAKERIGHT_IMGS from "@/data/MAKERIGHT_IMGS";
import Configurator from "@/components/global/Configurator";
import Split from "@/components/global/Split";
// import MAKERIGHT_IMGS from "/data/MAKERIGHT_IMGS";
// import Gantt from "/components/charts/Gantt";
// import BarGraph from "@/components/charts/BarGraph";
// import DLink from "@/components/utilities/DynamicLink";
// import PieChart from "@/components/charts/PieChart";
// import Button from "@/components/elements/Buttons";
// import Slideshow from "@/components/global/slideshow/Slideshow";
// import Pitch from "@/components/sections/Pitch";

function MADE({ setPopup }) {
  // TODO: just make it a prop
  const study = getStudy();

  // TODO: update intro image to match the mockups

  return (
    <>
      <CaseStudyPage id={study.id} study={study}>
        <Chapter id="Overview" name="Overview">
          <Section id="Overview--Client" type="columns" titled>
            <Title>Client</Title>
            <Heading>
              With a brand rooted in personalization, <br />
              MADE aimed to bring their bespoke offerings online
            </Heading>

            <Column>
              <Description className={"text-col-2 mt-3"}>
                <p>
                  An offering central to MADE’s image and reputation is having an <b>on-site stylist to support customers</b> in finding their best-suited look. However, at the time, <b>they didn’t feel their webstore reflected these offerings</b>.
                </p>
              </Description>
              <Graphic className="b-rad" img={MADE_IMGS.banner_client} />
            </Column>
          </Section>

          <Section id="Overview--Goal" type="overview" mainClassName={"gap-6"}>
            <Title>Goal</Title>
            <Heading>Provide online customers with the same flexibility as in-store clientele with a dress shirt configurator</Heading>
            <Description>
              <p>
                <b>MADE needed identical images of their offerings to slot into their software</b>. These images would also become product thumbnails for their webstore, allowing customers to browse their catalogue <b>without MADE individually photographing each shirt</b>.
              </p>
              <p>With 3D renders being the most efficient way to complete this goal, MADE reached out to me to work together in creating this customization utility.</p>
            </Description>
            <Graphic type="mask" img={MADE_IMGS.configurator_graphic} />
          </Section>

          <Section id="Overview--Needs" type="columns" titled mainClassName="mt-2" mainType="grid">
            <Title>Needs</Title>
            <Heading>MADE required:</Heading>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.requirements_photorealism} />
              <Description className="graphic--caption">
                <h3>
                  <b>Photorealism</b>
                </h3>
                <p className="mt-less">Images need to be 1 to 1 with product the customer receives</p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.requirements_consistency} />
              <Description className="graphic--caption">
                <h3>
                  <b>Consistency</b>
                </h3>
                <p className="mt-less">Shirt components cannot shift in position when their style or material is changed</p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.requirements_scalability} />
              <Description className="graphic--caption">
                <h3>
                  <b>Scalability</b>
                </h3>
                <p className="mt-less">40+ fabric variations, with a scalable approach to add more materials down the road</p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.requirements_experimentation} />
              <Description className="graphic--caption">
                <h3>
                  <b>Experimentation</b>
                </h3>
                <p className="mt-less">With the software still being ironed-out, room for testing was needed in the early stages</p>
              </Description>
            </Column>
          </Section>

          <Section id="Overview--Goal" background="tertiary" type={"columns"} titled>
            <Title>Outcome</Title>
            <Heading>The final configurator</Heading>

            <Column>
              <Graphic type="video" img={MADE_IMGS.configurator_demo} className="b-rad" muted autoplay="scroll" controls loop />
            </Column>
          </Section>
        </Chapter>

        <Chapter id="Approach" name="Approach">
          <Section id="Approach--Banner" background={MADE_IMGS.banner_building_renders}>
            <Heading>Building product renders</Heading>
          </Section>

          <Section id="Approach--Workflow" type="columns" titled mainType="grid" line="graphic--panel">
            <Title>Development Pipeline</Title>
            <Heading>Workflow overview</Heading>

            <Column caption="above">
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_modeling} />
              <Description type="h3" className="graphic--caption">
                <b>Modelling</b>
              </Description>
            </Column>

            <Column caption="above">
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_sculpting} />
              <Description type="h3" className="graphic--caption">
                <b>Sculpting</b>
              </Description>
            </Column>

            <Column caption="above">
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_creating_textures} />
              <Description type="h3" className="graphic--caption">
                <b>Creating Textures</b>
              </Description>
            </Column>

            <Column caption="above">
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_scripting} />
              <Description type="h3" className="graphic--caption">
                <b>Scripting</b>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_texturing} />
              <Description type="h3" className="graphic--caption mt-less">
                <b>Texturing</b>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_composing} />
              <Description type="h3" className="graphic--caption mt-less">
                <b>Composing</b>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_compositing} />
              <Description type="h3" className="graphic--caption mt-less">
                <b>Compositing</b>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_rendering} />
              <Description type="h3" className="graphic--caption mt-less">
                <b>Rendering</b>
              </Description>
            </Column>
          </Section>

          <Section id="Approach--Scope" type="columns" titled>
            <Title>Scope</Title>
            <Heading>Required 3D assets</Heading>
            <Column>
              <Configurator />
            </Column>
          </Section>

          <Section id="Approach--Considerations" type="columns" titled>
            <Title>Considerations</Title>
            <Heading>Understanding shirt anatomy to create accurate models</Heading>
            <Description className={"mt-less"}>A few key considerations when designing the shirt models that needed to be just right in order to accurately reflect MADE’s products:</Description>

            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.considerations_seam_positions} />
              <Heading type="h3" className="graphic--caption">
                Seam positions
              </Heading>
              <Description className="graphic--caption mt-less">Shirt proportions, and placement of the main seams</Description>
            </Column>
            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.considerations_seam_indents} />
              <Heading type="h3" className="graphic--caption">
                Seam indents
              </Heading>
              <Description className="graphic--caption mt-less">Making the object feel like real cloth, indented by the seams holding it together</Description>
            </Column>
            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.considerations_button_positions} />
              <Heading type="h3" className="graphic--caption">
                Button positions
              </Heading>
              <Description className="graphic--caption mt-less">Which components have or don’t have buttons, and where those buttons are placed</Description>
            </Column>
            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.considerations_collar_shape} />
              <Heading type="h3" className="graphic--caption">
                Collar shape
              </Heading>
              <Description className="graphic--caption mt-less">Ensuring that all the collars match the contours and shape of the base shirt</Description>
            </Column>
          </Section>

          <Section id="Approach--Models" type="columns" titled mainClassName={"gap-"}>
            <Title>Models</Title>

            <Column>
              <Graphic type="image" background="background darker" className="b-rad" img={MADE_IMGS.completed_collar_wide} />
            </Column>
            <Column>
              <Graphic type="image" background="background darker" className="b-rad" img={MADE_IMGS.completed_collar_mini_wide} />
            </Column>
            <Column>
              <Graphic type="image" background="background darker" className="b-rad" img={MADE_IMGS.completed_collar_band} />
            </Column>
            <Column>
              <Graphic type="image" background="background darker" className="b-rad" img={MADE_IMGS.completed_cuff_regular} />
            </Column>
            <Column>
              <Graphic type="image" background="background darker" className="b-rad" img={MADE_IMGS.completed_cuff_french} />
            </Column>
          </Section>

          <Section id="Approach--Imperfections" type="columns">
            <Column>
              <Split before={MADE_IMGS.sculpting_before} after={MADE_IMGS.sculpting_after} />
            </Column>
            <Column>
              <Title>Imperfections</Title>
              <Heading>
                Nothing real is perfect,
                <br />
                but too imperfect
                <br />
                is just messy
              </Heading>
              <Description>
                <p>With MADE’s goal of photorealism, the shirts needed an accurate ruffle to their appearance, without losing their high-fashion image. Too few wrinkles, and the shirts looked starched to death. Too many imperfections and they looked straight out of the hamper.</p>

                <p>They needed just a light touch of wrinkles, which varied across components due to their construction. Ex. Some collars had stiffer reinforcements than others.</p>
              </Description>
            </Column>
          </Section>



          
        </Chapter>

        <Chapter id="Closing" name="Closing"></Chapter>
      </CaseStudyPage>
    </>
  );
}

export default MADE;
