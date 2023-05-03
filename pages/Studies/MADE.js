import { getStudy } from "@/scripts/GetStudy";
import CaseStudyPage from "@/components/studies/CaseStudyPage";
import { MADE_IMGS } from "@/data/MADE_IMGS";
import { Section, Chapter, Title, Column, Heading, Description, Graphic, Quote } from "@/components/sections/Sections";
import Configurator from "@/components/global/Configurator";
import Split from "@/components/global/Split";
import ImageRow from "@/components/global/ImageRow";
import ProsCons, { Con, Pro } from "@/components/global/ProsCons";
import { STUDY_MADE } from "@/data/CASE_STUDIES";
import { useEffect } from "react";
import { useResponsive } from "@/scripts/contexts/ResponsiveContext";

function MADE() {
  const study = STUDY_MADE;

  const { desktop, isBpAndDown, bp, loading } = useResponsive();
  const lgAndDown = !(!isBpAndDown("lg") || loading);
  const smAndDown = !(!isBpAndDown("sm") || loading);

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
              <Description className={"text-col-2 gap-3 mt-3"}>
                <p>
                  An offering central to MADE’s image and reputation is having an <b>on-site stylist to support customers</b> in finding their
                  best-suited look. However, at the time, <b>they didn’t feel their webstore reflected these offerings</b>.
                </p>
              </Description>
              <Graphic className="b-rad" img={MADE_IMGS.banner_client} />
            </Column>
          </Section>

          <Section id="Overview--Goal" type="overview">
            <Title>Goal</Title>
            <Heading>Provide online customers with the same flexibility as in-store clientele with a dress shirt configurator</Heading>
            <Description>
              <p>
                <b>MADE needed identical images of their offerings to slot into their software</b>. These images would also become product thumbnails
                for their webstore, allowing customers to browse their catalogue <b>without MADE individually photographing each shirt</b>.
              </p>
              <p>
                With 3D renders being the most efficient way to complete this goal, MADE reached out to me to work together in creating this
                customization utility.
              </p>
            </Description>
            <Graphic type="mask" img={MADE_IMGS.configurator_graphic} />
          </Section>

          <Section id="Overview--Needs" type="columns" titled mainClassName="mt-2" mainType="grid">
            <Title>Needs</Title>
            <Heading>MADE required:</Heading>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.requirements_photorealism} />
              <Description className="graphic--caption">
                <Heading type={!smAndDown ? `h3` : "h5"}>
                  <b>Photorealism</b>
                </Heading>
                <p>Images need to be 1 to 1 with product the customer receives</p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.requirements_consistency} />
              <Description className="graphic--caption">
                <Heading type={!smAndDown ? `h3` : "h5"}>
                  <b>Consistency</b>
                </Heading>
                <p>Seamless switching between component styles and materials</p>
                {/* <p>{!smAndDown ? `Shirt components cannot shift in position when their style or material is changed` : 'Seamless switching between component styles and materials'}</p> */}
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.requirements_scalability} />
              <Description className="graphic--caption">
                <Heading type={!smAndDown ? `h3` : "h5"}>
                  <b>Scalability</b>
                </Heading>
                <p>40+ fabric variations, with a scalable approach to add more materials down the road</p>
              </Description>
            </Column>

            <Column>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.requirements_experimentation} />
              <Description className="graphic--caption">
                <Heading type={!smAndDown ? `h3` : "h5"}>
                  <b>Experimentation</b>
                </Heading>
                <p>With the software still being ironed-out, room for testing was needed in the early stages</p>
              </Description>
            </Column>
          </Section>

          <Section id="Overview--Outcome" background="tertiary" type={"columns"} titled>
            <Title>Outcome</Title>
            <Heading>Final configurator</Heading>

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

            <Column caption={"above"}>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_modeling} />
              <Description type={!smAndDown ? "h3" : "h5"} className="graphic--caption">
                <b>Modelling</b>
              </Description>
            </Column>

            <Column caption="above">
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_sculpting} />
              <Description type={!smAndDown ? "h3" : "h5"} className="graphic--caption">
                <b>Sculpting</b>
              </Description>
            </Column>

            <Column caption="above">
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_creating_textures} />
              <Description type={!smAndDown ? "h3" : "h5"} className="graphic--caption">
                <b>Creating Textures</b>
              </Description>
            </Column>

            <Column caption="above">
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_scripting} />
              <Description type={!smAndDown ? "h3" : "h5"} className="graphic--caption">
                <b>Scripting</b>
              </Description>
            </Column>

            <Column caption={lgAndDown ? "above" : ""}>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_texturing} />
              <Description type={!smAndDown ? "h3" : "h5"} className={`graphic--caption ${!lgAndDown && "mt-less"}`}>
                <b>Texturing</b>
              </Description>
            </Column>

            <Column caption={lgAndDown ? "above" : ""}>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_composing} />
              <Description type={!smAndDown ? "h3" : "h5"} className={`graphic--caption ${!lgAndDown && "mt-less"}`}>
                <b>Composing</b>
              </Description>
            </Column>

            <Column caption={lgAndDown ? "above" : ""}>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_compositing} />
              <Description type={!smAndDown ? "h3" : "h5"} className={`graphic--caption ${!lgAndDown && "mt-less"}`}>
                <b>Compositing</b>
              </Description>
            </Column>

            <Column caption={lgAndDown ? "above" : ""}>
              <Graphic type="mask" background="background darker" img={MADE_IMGS.workflow_rendering} />
              <Description type={!smAndDown ? "h3" : "h5"} className={`graphic--caption ${!lgAndDown && "mt-less"}`}>
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

          <Section id="Approach--Considerations" type="columns" titled mainType="grid">
            <Title>Considerations</Title>
            <Heading>Understanding shirt anatomy to create accurate models</Heading>
            <Description className="mt-less">
              <p>
                A few key considerations when designing the shirt models that needed to be just right in order to accurately reflect MADE’s products:
              </p>
            </Description>

            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.considerations_seam_positions} />
              <Heading type={!smAndDown ? `h3` : "h5"} className={`graphic--caption ${!smAndDown && `weight-reg`}`}>
                Seam positions
              </Heading>
              <Description>
                <p>Shirt proportions, and placement of the main seams</p>
              </Description>
            </Column>
            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.considerations_seam_indents} />
              <Heading type={!smAndDown ? `h3` : "h5"} className={`graphic--caption ${!smAndDown && `weight-reg`}`}>
                Seam indents
              </Heading>
              <Description>
                <p>Making the object feel like real cloth, indented by the seams holding it together</p>
              </Description>
            </Column>
            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.considerations_button_positions} />
              <Heading type={!smAndDown ? `h3` : "h5"} className={`graphic--caption ${!smAndDown && `weight-reg`}`}>
                Button positions
              </Heading>
              <Description>
                <p>Which components have or don’t have buttons, and where those buttons are placed</p>
              </Description>
            </Column>
            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.considerations_collar_shape} />
              <Heading type={!smAndDown ? `h3` : "h5"} className={`graphic--caption ${!smAndDown && `weight-reg`}`}>
                Collar shape
              </Heading>
              <Description>
                <p>Ensuring that all the collars match the contours and shape of the base shirt</p>
              </Description>
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
                <br className="d-block d-lg-none d-sm-block" /> but too imperfect
                <br className="d-block d-lg-none d-sm-block" /> is just messy
              </Heading>
              <Description>
                <p>
                  With MADE’s goal of photorealism, the shirts needed an accurate ruffle to their appearance, without losing their high-fashion image.
                  Too few wrinkles, and the shirts looked starched to death. Too many imperfections and they looked straight out of the hamper.
                </p>

                <p>
                  They needed just a light touch of wrinkles, which varied across components due to their construction. Ex. Some collars had stiffer
                  reinforcements than others.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Approach--Summary" titled mainClassName={"gap-"}>
            <Heading>
              The shirts now needed to be textured <br className="d-sm-none " /> using MADE’s own fabric swatches.
            </Heading>
          </Section>
        </Chapter>

        <Chapter id="Texturing" name="Texturing">
          <Section id="Texturing--Workflow" type="columns" titled="above" background="background darker">
            <Title>Workflow</Title>
            <Column>
              <Heading>
                Converting <br className="d-block d-md-none " /> fabric swatches <br className="d-block d-md-none " /> to 3D textures
              </Heading>
            </Column>
            <Column>
              <Description className={desktop && "mt-less" }>
                <p>
                  <b>In order for the models to reflect actual products, they needed to be textured with over 40 scans of MADE’s custom fabrics.</b>
                </p>
                <p>
                  Working closely together, I tested several workflows for converting fabric scans to 3D textures. This allowed me to determine which
                  was the most time-efficient, best looking, and scalable; as MADE needed the capability to rapidly add fabrics in the future.
                </p>
                <p>
                  I used a combination of Blender and Photoshop to undistort the scans, and create the repeatable textures. Chosen for its efficiency,
                  and compatibility with MADE’s scanning hardware.
                </p>
              </Description>
            </Column>
          </Section>

          <Section
            id="Texturing--Stages"
            type="columns"
            wrapperClassName="mt-less"
            titled
            arrows
            mainClassName="gap-6"
            mainType="grid"
            background="background darker">


            <Column caption="above">
              <Heading type="h3" className={`graphic--caption weight-reg`}>
                Fabric Scan
              </Heading>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.texture_creation_1_scan} />
            </Column>
            <Column caption="above">
              <Heading type="h3" className={`graphic--caption weight-reg`}>
                Cropped
              </Heading>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.texture_creation_2_cropped} />
            </Column>
            <Column caption="above">
              <Heading type="h3" className={`graphic--caption weight-reg`}>
                Traced
              </Heading>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.texture_creation_3_traced} />
            </Column>
            <Column caption="above">
              <Heading type="h3" className={`graphic--caption weight-reg`}>
                Straightened
              </Heading>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.texture_creation_4_straightened} />
            </Column>
            <Column caption="above">
              <Heading type="h3" className={`graphic--caption weight-reg`} sameHeight="repeatable_texture">
                Repeatable texture
              </Heading>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.texture_creation_5_repeatable} />
            </Column>
            <Column caption="above">
              <Heading type="h3" className={`graphic--caption weight-reg`} sameHeight="repeatable_texture">
                3D material
              </Heading>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.texture_creation_6_material} />
            </Column>


          </Section>

          <Section id="Texturing--Contrast-Desc" type="columns" titled="above" background="background darker" wrapperClassName="mb-less-2">
            <Title>Contrast Areas</Title>
            <Column>
              <Heading>
                Adding customizable <br className="d-lg-none" />
                accent fabric to reflect <br className="d-lg-none" />
                in-store offerings
              </Heading>
            </Column>
            <Column>
              <Description>
                ‘Contrast areas’ are the parts of the dress shirt which accent the garment with an alternate fabric pallet. They were a <b>critical project requirement</b> as the online tool needed to represent the full scope of the customization available, which
                includes personalized accent areas.
              </Description>
            </Column>
          </Section>

          <Section id="Texturing--Contrast-Areas" type="columns" background="background darker">
            <Column>
              <Graphic
                type="video"
                className="b-rad"
                img={MADE_IMGS.contrast_glow_mini_wide_fabric_video}
                background="background darkest"
                autoplay="scroll staggered hover"
                muted
                sync="Texturing--Contrast-Areas"
              />
            </Column>
            <Column>
              <Graphic
                type="video"
                className="b-rad"
                img={MADE_IMGS.contrast_glow_wide_fabric_video}
                background="background darkest"
                autoplay="scroll staggered hover"
                muted
                sync="Texturing--Contrast-Areas"
              />
            </Column>
          </Section>

          <Section id="Texturing--Contrast-Split" type="columns" background="background darker">
            <Column>
              <Graphic
                type="video"
                className="b-rad"
                img={MADE_IMGS.contrast_split_mini_wide_video}
                background="background darkest"
                autoplay="scroll staggered hover"
                muted
                sync="Texturing--Contrast-Split"
              />
              <Description className="graphic--caption">
                Our goal was to give shoppers the ability to alter their shirt&rsquo;s accent fabric, with 50+ available materials.
              </Description>
            </Column>
            <Column>
              <Graphic
                type="video"
                className="b-rad"
                img={MADE_IMGS.contrast_split_wide_video}
                background="background darkest"
                autoplay="scroll staggered hover"
                muted
                sync="Texturing--Contrast-Split"
              />
              <Description className="graphic--caption">
                To enable this, the inner lining of all 3 collars, and 1 cuff, needed to be isolated, and rendered as separate images.
              </Description>
            </Column>
          </Section>

          <Section id="Texturing--Details-Description" type="columns" titled="above" background="background darker" wrapperClassName="mb-less-2">
            <Title>Additional Details</Title>
            <Column>
              <Heading>
                The devil is in the details / <br />
                The realism is in the seams
              </Heading>
            </Column>
            <Column>
              <Description>
                Lastly, the following details were added to increase the accuracy of the objects in relation to the real world products, and the
                subtleties of their design.
              </Description>
            </Column>
          </Section>

          <Section id="Texturing--Details-Graphics" type="columns" titled mainType="grid" background="background darker" mainClassName="mt-0">
            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.details_threading} />
              <Heading type="h3" className="graphic--caption weight-reg">
                Color-matched threading
              </Heading>
              <Description className="graphic--caption mt-less">
                I manually approximated matching thread colors for each shirt material. A simple task for solid-colors, occasionally tricky with
                complex patterns.
              </Description>
            </Column>
            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.details_holes} />
              <Heading type="h3" className="graphic--caption weight-reg">
                Color-matched button holes
              </Heading>
              <Description className="graphic--caption mt-less">
                Buttonhole colors for each material were done separately, in a similar way to the threading. Requiring their own fine-tuning to better
                match the threads in the final renders.
              </Description>
            </Column>
            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.details_button} />
              <Heading type="h3" className="graphic--caption weight-reg">
                Button color
              </Heading>
              <Description className="graphic--caption mt-less">
                Either a dark or light button was assigned to each shirt material respective of its colour.
              </Description>
            </Column>
            <Column>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.details_logo} />
              <Heading type="h3" className="graphic--caption weight-reg">
                MADE Logo tag
              </Heading>
              <Description className="graphic--caption mt-less">Added with a focus on legibility, without being overbearing.</Description>
            </Column>
          </Section>

          <Section id="Texturing--Transition" type="passthrough" margin="none">
            <ImageRow col="6" direction="right">
              <Graphic type="image" img={MADE_IMGS.shirt_row_04} />
              <Graphic type="image" img={MADE_IMGS.shirt_row_06} />
              <Graphic type="image" img={MADE_IMGS.shirt_row_02} />
              <Graphic type="image" img={MADE_IMGS.shirt_row_01} />
              <Graphic type="image" img={MADE_IMGS.shirt_row_03} />
              <Graphic type="image" img={MADE_IMGS.shirt_row_05} />
            </ImageRow>
          </Section>
        </Chapter>

        <Chapter id="Rendering" name="Rendering">
          <Section id="Rendering--Lighting" type="columns" background="background darkest">
            <Column>
              <Split before={MADE_IMGS.lighting_before} after={MADE_IMGS.lighting_after} square />
            </Column>
            <Column>
              <Title>Lighting</Title>
              <Heading>
                Lighting
                <br />
                the final composition
              </Heading>
              <Description>
                <p>
                  At this stage, MADE’s design goals were on soft, consistent lighting, without it being so flat that shirts appear bland or even
                  artificial. Gentle shadows, with nothing distracting from the product.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Rendering--Shadow-Description" type="columns" titled="above" background="background darkest" wrapperClassName="mb-less">
            <Title>Shadows</Title>
            <Column>
              <Heading>Supporting the final use-case by embedding shadows within each component image.</Heading>
            </Column>
            <Column>
              <Description className={"mt-less"}>
                <p>
                  Our goal was to create separate images of shirt components that could be stacked into one life-like photo. I knew that to do this
                  realistically, each image would have to be a combination of the object, and a rendered shadow behind it. Allowing the shirt pieces
                  to accurately sit atop each other without looking flat, or uncanny.
                </p>

                <p>
                  Adding generic ‘drop-shadows’ could quickly achieve this outcome, but it would sacrifice photorealism. To do this without
                  compromise, I created isolated renderings of each shadow, and combined the images in post. This is the difference between each
                  method:
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Rendering--Shadow-Graphics" type="columns" background="background darkest">
            <Column caption="above">
              <Heading type="h4" className="graphic--caption graphic--caption__above">
                Drop-shadows:
              </Heading>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.lighting_drop} background="background darker" square />
            </Column>
            <Column caption="above">
              <Heading type="h4" className="graphic--caption graphic--caption__above">
                Rendered shadows:
              </Heading>
              <Graphic type="image" className="b-rad" img={MADE_IMGS.lighting_after} background="background darker" square />
            </Column>
          </Section>

          <Section
            id="Rendering--Post"
            type="columns"
            titled
            arrows="anchored primary"
            mainClassName="gap-6"
            mainType="grid"
            background="background darkest">
            <Title>Post-Processing</Title>
            <Heading>Creating isolated, physically accurate shadows</Heading>

            <Column caption="above">
              <Description className="graphic--caption weight-reg">
                <h3>Target component</h3>
              </Description>
              <Graphic type="image" className="b-rad" background="background darker" img={MADE_IMGS.shadow_creation_1_target} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption weight-reg">
                <h3>Hidden from render</h3>
              </Description>
              <Graphic type="image" className="b-rad" background="background darker" img={MADE_IMGS.shadow_creation_2_hidden} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption weight-reg">
                <h3> Isolated shadow</h3>
              </Description>
              <Graphic type="image" className="b-rad" background="background darker" img={MADE_IMGS.shadow_creation_3_isolated} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption weight-reg">
                <h3>Edited</h3>
              </Description>
              <Graphic type="image" className="b-rad" background="background darker" img={MADE_IMGS.shadow_creation_4_edited} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption weight-reg">
                <h3>Combined</h3>
              </Description>
              <Graphic type="image" className="b-rad" background="background darker" img={MADE_IMGS.shadow_creation_5_combined} />
            </Column>
            <Column caption="above">
              <Description className="graphic--caption graphic--caption__above weight-reg">
                <h3>Final</h3>
              </Description>
              <Graphic type="image" className="b-rad" background="background darker" img={MADE_IMGS.shadow_creation_6_final} />
            </Column>
          </Section>

          <Section id="Rendering--Roadblocks-Description" type="columns" titled="above" background="background darker" wrapperClassName="mb-less">
            <Title>Roadblocks To Rendering</Title>
            <Column>
              <Heading>Working around my hardware limitations</Heading>
            </Column>
            <Column>
              <Description className={"mt-less"}>
                <p>
                  With my <b>incredibly underpowered PC</b>, I was unable to complete the rendering for the entire project in a reasonable amount of
                  time. To solve this, I used an online render farm service.
                </p>

                <p>
                  This required me to build my 3D project file in such a way that it could
                  <b>produce the hundreds of images in one continuous session</b>, so as to not waste time starting and stopping render jobs.
                </p>

                <p>
                  However, the <b>rendering service I used had strict file size limitations</b>. This greatly impacted my available options when
                  trying to build a file which could render all the images continuously.
                </p>

                <p>Possible approaches to creating a continuous render sequence:</p>
              </Description>
            </Column>
          </Section>

          <Section id="Rendering--Roadblocks-Graphics" type="columns" background="background darker">
            <Column caption="split">
              <Heading className="graphic--caption graphic--caption__above weight-reg" type="h3">
                Move the virtual camera
                <br /> across multiple objects
              </Heading>
              <Graphic
                type="video"
                className="b-rad border border-negative"
                img={MADE_IMGS.limitations_multiple_objects}
                background="background darkest"
                autoplay="scroll staggered hover"
                muted
                sync="Rendering--Roadblocks-Graphics"
              />
              <Description className="graphic--caption">
                <ProsCons>
                  <Con>Huge file size due to number of objects</Con>
                  <Con>Harder to edit / less scalable</Con>
                  <Pro>Easy to set-up</Pro>
                </ProsCons>
              </Description>
            </Column>

            <Column caption="split">
              <Heading className="graphic--caption graphic--caption__above weight-reg" type="h3">
                Stationary camera, with one object
                <br />
                that changes materials
              </Heading>
              <Graphic
                type="video"
                className="b-rad border border-positive"
                img={MADE_IMGS.limitations_single_object}
                background="background darkest"
                autoplay="scroll staggered hover"
                muted
                sync="Rendering--Roadblocks-Graphics"
              />
              <Description className="graphic--caption">
                <ProsCons>
                  <Pro>Tiny file size</Pro>
                  <Pro>Future-proof, scalable, easy to manipulated</Pro>
                  <Con>More involved set-up process</Con>
                </ProsCons>
              </Description>
            </Column>
          </Section>

          <Section id="Rendering--Python-Description" type="columns" titled="above" background="background darker" wrapperClassName="mb-less-2">
            <Title>Roadblocks To Rendering</Title>
            <Column>
              <Heading>Using Python to create a dynamic texture that could change fabrics every frame</Heading>
            </Column>
            <Column>
              <Description className={"mt-less"}>
                <p>
                  Pursuing the latter solution, I wrote a python script which created a single 3D material containing all 41 fabrics, and had the
                  ability to easily switch between them.
                </p>
                <p>
                  From there, I could then render a single “video” who’s frames contained every combination of object and fabric. This allowed me to
                  push through the limits of my hardware and completed all of the rendering at no added cost to the project timeline.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Rendering--Python-Graphic" type="columns" titled="above" background="background darker" wrapperClassName="mb-less">
            <Column>
              <Graphic
                type="video"
                className="b-rad"
                img={MADE_IMGS.limitations_switcher}
                background="background darkest"
                autoplay="scroll hover"
                muted
              />
            </Column>
          </Section>

          <Section id="Rendering--Scalable" type="columns" titled background="background darker">
            <Column>
              <Graphic
                type="video"
                className="b-rad"
                img={MADE_IMGS.limitations_bottle}
                background="background darkest"
                autoplay="scroll hover"
                muted
              />
            </Column>
            <Column>
              <Heading>
                Benefits of a <br />
                scalable approach
              </Heading>
              <Description>
                <p>I’ve been able to tweak and reuse this same script numerous times since developing it for this project.</p>
                <p>
                  Many of my product rendering tasks employ this same workflow of having one object cycle through X materials. As such, choosing to
                  create a strong, future-proof solution to this issue has since saved me countless hours.
                </p>
              </Description>
            </Column>
          </Section>

          <Section id="Rendering--Closing">
            <Heading>
              With rendering now complete, the final images
              <br />
              were delivered, and placed into the webstore’s
              <br />
              new dress-shirt customization tool.
            </Heading>
          </Section>
        </Chapter>

        <Chapter id="Delivery" name="Delivery">
          <Section id="Delivery--Banner" background={MADE_IMGS.banner_delivery}>
            <Heading>Delivered Project</Heading>
          </Section>

          <Section id="Delivery--Config" background="background darkest" type={"columns"} titled>
            <Heading className="color--primary">Final configurator</Heading>
            <Column>
              <Graphic type="video" img={MADE_IMGS.configurator_demo} className="b-rad" muted autoplay="scroll" controls/>
            </Column>
          </Section>

          <Section id="Delivery--Images-1" background="background darkest" type="passthrough" margin="none">
            <ImageRow col="3" direction="right">
              <Graphic type="image" img={MADE_IMGS.delivery_shirt_01} />
              <Graphic type="image" img={MADE_IMGS.delivery_shirt_02} />
              <Graphic type="image" img={MADE_IMGS.delivery_shirt_03} />
            </ImageRow>
          </Section>

          <Section id="Delivery--Images-2" background="background darkest" type="passthrough" margin="none">
            <ImageRow col="3" direction="left">
              <Graphic type="image" img={MADE_IMGS.delivery_shirt_04} />
              <Graphic type="image" img={MADE_IMGS.delivery_shirt_05} />
              <Graphic type="image" img={MADE_IMGS.delivery_shirt_06} />
            </ImageRow>
          </Section>

          <Section id="Delivery--Images-3" background="background darkest" type="passthrough" margin="none">
            <ImageRow col="3" direction="right">
              <Graphic type="image" img={MADE_IMGS.delivery_shirt_07} />
              <Graphic type="image" img={MADE_IMGS.delivery_shirt_08} />
              <Graphic type="image" img={MADE_IMGS.delivery_shirt_09} />
            </ImageRow>
          </Section>

          <Section id="Delivery--Closing" background={MADE_IMGS.banner_final_blue} />
        </Chapter>

        <Chapter id="Closing" name="Closing">
          <Section id="Closing--Copy" type="columns" titled mainClassName="gap-6 mt-6">
            <Title>Successes</Title>
            <Heading>Foresight, and planning around project requirements</Heading>
            <Description className="text-col-2 text-gap-6">
              <p>
                During this project&rsquo;s early stages, I identified many requirements for my images. Ones that I needed to meet if they were to
                suit my client&rsquo;s needs. An example of this was when we first discussed creating a single shirt from stacked image layers. With
                this goal understood, I was able to discern the steps necessary to match the use-case. I knew each image needed their object&rsquo;s
                shadows placed in the background. Otherwise, they wouldn&rsquo;t combine realistically.
              </p>

              <p>
                This gave me significant time to plan ahead. I conducted tests using the first few models, and determined the best approach to
                creating realistic shadows. Allowing me to then build the project from the ground-up with the eventuality of this challenge in mind.
                Then, when the time came to create the objects&rsquo; shadows, I was fully prepared to traverse the issue. With this, and other
                similar moments, the greatest success of this project was my foresight and planning.
              </p>
            </Description>

            <Column>
              <Title>Learning</Title>
              <Heading>Scalable, future-proof foundations, over band-aid solutions</Heading>
              <Description>
                <p>
                  This was a relatively long-term project with big plans for future expansion. As such, I often had to make critical decisions on how
                  to best spend my resources. At the center of these decisions was usually a common internal question. Should I take the time to craft
                  a lasting foundation to address an issue, or use a more temporary solution? The latter allots more time to other important tasks.
                  But, the former is more likely to increase efficiency throughout the project.
                </p>
                <p>
                  As the project went on, time and again I felt vindicated in choosing the former. These solutions included working non-destructively
                  when possible, and writing flexible, responsive scripts. Long-term fixes consistently saved me more time than hasty band-aid
                  solutions. As a result, this project serves as an important learning experience. During long-term projects, especially in a 3D
                  space, a strong foundation is incredibly important. They almost always save more resources in the end, and may even apply to future
                  projects.
                </p>
              </Description>
            </Column>

            <Column>
              <Title>Areas Of Growth</Title>
              <Heading>Over fixation on a single aspect of a task</Heading>
              <Description>
                <p>
                  After modelling, my objects needed to be UV-unwrapped so I could add their fabric textures. As I was working on the shirt collars, I
                  made the mistake of fixating on how they appeared in a small sampling of fabrics. Rather than checking each texture, and comparing
                  them to my references. This caused me to think that the models were ready to be rendered, so I sent them off. When the images
                  arrived, I finally realized the mistake. Some of the fabrics appeared distorted, and needed revision. Thankfully, I was able to
                  correct them, re-render, and meet the intended deadline.
                </p>
                <p>
                  This teachable moment reminded me of what is possible when you lose sight of a project&rsquo;s full scope. Going forward, I aim to
                  address this by regularly checking my project outline with every working session. Thereby reminding myself of the bigger picture,
                  and to look ahead to the next steps towards which I&rsquo;m building.
                </p>
              </Description>
            </Column>
          </Section>
        </Chapter>
      </CaseStudyPage>
    </>
  );
}

export default MADE;
