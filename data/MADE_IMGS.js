import { processGroups, processImages } from "@/scripts/ProcessImages";

const MADE_IMGS = processImages({
  banner_building_renders: {
    name: "banner_building_renders",
    src: "./assets/images/case_studies/made/banners/banner_building_renders.png",
    alt: "An image of an elderly tailor working with cloth",
    width: 3840,
    height: 1400,
  },
  banner_client: {
    name: "banner_client",
    src: "./assets/images/case_studies/made/banners/banner_client.png",
    alt: "A stylish man wearing a casual dress shirt in front of a cityscape",
    width: 2240,
    height: 996,
  },
  banner_delivery: {
    name: "banner_delivery",
    src: "./assets/images/case_studies/made/banners/banner_delivery.png",
    alt: "A rendering of a shirt lying on a tabletop",
    width: 3840,
    height: 1000,
  },
  banner_final_blue: {
    name: "banner_final_blue",
    src: "./assets/images/case_studies/made/banners/banner_final_blue.png",
    alt: "The text 'MADE' rendered in blue fuzzy fabric letters",
    width: 1920,
    height: 500,
  },
  banner_final_green: {
    name: "banner_final_green",
    src: "./assets/images/case_studies/made/banners/banner_final_green.png",
    alt: "The text 'MADE' rendered in green fuzzy fabric letters",
    width: 1920,
    height: 500,
  },
  banner_final_plaid: {
    name: "banner_final_plaid",
    src: "./assets/images/case_studies/made/banners/banner_final_plaid.png",
    alt: "The text 'MADE' rendered in plaid fuzzy fabric letters",
    width: 1920,
    height: 500,
  },
  completed_collar_band: {
    name: "completed_collar_band",
    src: "./assets/images/case_studies/made/completed_models/completed_collar_band.png",
    alt: "A 3D rendering of a purple band shirt collar isolated against a blank background",
    width: 860,
    height: 870,
    group: "completed_models",
  },
  completed_collar_mini_wide: {
    name: "completed_collar_mini_wide",
    src: "./assets/images/case_studies/made/completed_models/completed_collar_mini_wide.png",
    alt: "A 3D rendering of a purple mini-wide shirt collar isolated against a blank background",
    width: 915,
    height: 1000,
    group: "completed_models",
  },
  completed_collar_wide: {
    name: "completed_collar_wide",
    src: "./assets/images/case_studies/made/completed_models/completed_collar_wide.png",
    alt: "A 3D rendering of a purple wide shirt collar isolated against a blank background",
    width: 950,
    height: 1050,
    group: "completed_models",
  },
  completed_cuff_french: {
    name: "completed_cuff_french",
    src: "./assets/images/case_studies/made/completed_models/completed_cuff_french.png",
    alt: "A 3D rendering of a purple french shirt cuff isolated against a blank background",
    width: 605,
    height: 920,
    group: "completed_models",
  },
  completed_cuff_regular: {
    name: "completed_cuff_regular",
    src: "./assets/images/case_studies/made/completed_models/completed_cuff_regular.png",
    alt: "A 3D rendering of a purple standard dress-shirt cuff isolated against a blank background",
    width: 635,
    height: 840,
    group: "completed_models",
  },
  considerations_button_positions: {
    name: "considerations_button_positions",
    src: "./assets/images/case_studies/made/considerations/considerations_button_positions.png",
    alt: "A close up rendering of a cuff resting on a shirt base, with buttons in various positions",
    width: 1200,
    height: 1200,
    group: "considerations",
  },
  considerations_collar_shape: {
    name: "considerations_collar_shape",
    src: "./assets/images/case_studies/made/considerations/considerations_collar_shape.png",
    alt: "A close up rendering of the neck-hole of a shirt, focusing on the contour of the collar",
    width: 1200,
    height: 1200,
    group: "considerations",
  },
  considerations_seam_indents: {
    name: "considerations_seam_indents",
    src: "./assets/images/case_studies/made/considerations/considerations_seam_indents.png",
    alt: "A close up rendering of a shirt collar meeting the base of the shirt, highlighting the indentations which follow the seams",
    width: 1200,
    height: 1200,
    group: "considerations",
  },
  considerations_seam_positions: {
    name: "considerations_seam_positions",
    src: "./assets/images/case_studies/made/considerations/considerations_seam_positions.png",
    alt: "A close up of the neck hole of a dress shirt, highlighting the seams along the shoulder and back",
    width: 1200,
    height: 1200,
    group: "considerations",
  },
  delivery_shirt_01: {
    name: "delivery_shirt_01",
    src: "./assets/images/case_studies/made/delivery/delivery_shirt_01.png",
    alt: "A blue dress shirt with white contrast fabric, a mini-wide collar, regular cuff, and white buttons",
    width: 1200,
    height: 1200,
    group: "delivery",
  },
  delivery_shirt_02: {
    name: "delivery_shirt_02",
    src: "./assets/images/case_studies/made/delivery/delivery_shirt_02.png",
    alt: "A grey dress shirt with paisley contrast fabric, a mini-wide collar, regular cuff, and white buttons",
    width: 1200,
    height: 1200,
    group: "delivery",
  },
  delivery_shirt_03: {
    name: "delivery_shirt_03",
    src: "./assets/images/case_studies/made/delivery/delivery_shirt_03.png",
    alt: "A green dress shirt with white contrast fabric, a mini-wide collar, regular cuff, and dark buttons",
    width: 1200,
    height: 1200,
    group: "delivery",
  },
  delivery_shirt_04: {
    name: "delivery_shirt_04",
    src: "./assets/images/case_studies/made/delivery/delivery_shirt_04.png",
    alt: "A very light purple dress shirt with grey contrast fabric, a wide collar, french cuff, and no contrast fabric",
    width: 1200,
    height: 1200,
    group: "delivery",
  },
  delivery_shirt_05: {
    name: "delivery_shirt_05",
    src: "./assets/images/case_studies/made/delivery/delivery_shirt_05.png",
    alt: "A green plaid dress shirt with no contrast fabric, a wide collar, regular cuff, and dark buttons",
    width: 1200,
    height: 1200,
    group: "delivery",
  },
  delivery_shirt_06: {
    name: "delivery_shirt_06",
    src: "./assets/images/case_studies/made/delivery/delivery_shirt_06.png",
    alt: "A light blue dress shirt with no contrast fabric, a wide collar, regular cuff, and white buttons",
    width: 1200,
    height: 1200,
    group: "delivery",
  },
  delivery_shirt_07: {
    name: "delivery_shirt_07",
    src: "./assets/images/case_studies/made/delivery/delivery_shirt_07.png",
    alt: "A dark grey dress shirt with no contrast fabric, a band collar, french cuff, and white buttons",
    width: 1200,
    height: 1200,
    group: "delivery",
  },
  delivery_shirt_08: {
    name: "delivery_shirt_08",
    src: "./assets/images/case_studies/made/delivery/delivery_shirt_08.png",
    alt: "A navy blue dress shirt with spotted contrast fabric, a band collar, regular cuff, and dark buttons",
    width: 1200,
    height: 1200,
    group: "delivery",
  },
  delivery_shirt_09: {
    name: "delivery_shirt_09",
    src: "./assets/images/case_studies/made/delivery/delivery_shirt_09.png",
    alt: "A very light blue dress shirt with white contrast fabric, a band collar, regular cuff, and white buttons",
    width: 1200,
    height: 1200,
    group: "delivery",
  },
  details_button: {
    name: "details_button",
    src: "./assets/images/case_studies/made/details/details_button.png",
    alt: "A split image of a dark shirt and a light shirt, showing that each has a different button color",
    width: 1000,
    height: 1000,
    group: "details",
  },
  details_holes: {
    name: "details_holes",
    src: "./assets/images/case_studies/made/details/details_holes.png",
    alt: "A close up rendering of a button-hole on a dress shirt, showing that it is color matched to the shirt fabric",
    width: 1000,
    height: 1000,
    group: "details",
  },
  details_logo: {
    name: "details_logo",
    src: "./assets/images/case_studies/made/details/details_logo.png",
    alt: "A close up rendering of the logo tag of a dress shirt",
    width: 1000,
    height: 1000,
    group: "details",
  },
  details_threading: {
    name: "details_threading",
    src: "./assets/images/case_studies/made/details/details_threading.png",
    alt: "A close-up rendering of the stitching on a dress shirt, showing that it is color matched to the shirt fabric",
    width: 1000,
    height: 1000,
    group: "details",
  },
  component_base: {
    name: "component_base",
    src: "./assets/images/case_studies/made/illustrations/component_base.svg",
    alt: "An illustrated graphic of a shirt base",
    width: 64,
    height: 96,
  },
  component_collar_band: {
    name: "component_collar_band",
    src: "./assets/images/case_studies/made/illustrations/component_collar_band.svg",
    alt: "An illustrated graphic of a band collar",
    width: 82,
    height: 82,
  },
  component_collar_mini_wide: {
    name: "component_collar_mini_wide",
    src: "./assets/images/case_studies/made/illustrations/component_collar_mini_wide.svg",
    alt: "An illustrated graphic of a mini-wide collar",
    width: 78,
    height: 88,
  },
  component_collar_wide: {
    name: "component_collar_wide",
    src: "./assets/images/case_studies/made/illustrations/component_collar_wide.svg",
    alt: "An illustrated graphic of a wide collar",
    width: 77,
    height: 84,
  },
  component_cuff_french: {
    name: "component_cuff_french",
    src: "./assets/images/case_studies/made/illustrations/component_cuff_french.svg",
    alt: "An illustrated graphic of a french cuff",
    width: 94,
    height: 61,
  },
  component_cuff_regular: {
    name: "component_cuff_regular",
    src: "./assets/images/case_studies/made/illustrations/component_cuff_regular.svg",
    alt: "An illustrated graphic of a regular cuff",
    width: 94,
    height: 62,
  },
  component_placket_hidden: {
    name: "component_placket_hidden",
    src: "./assets/images/case_studies/made/illustrations/component_placket_hidden.svg",
    alt: "An illustrated graphic of a hidden placket",
    width: 95,
    height: 96,
  },
  component_placket_regular: {
    name: "component_placket_regular",
    src: "./assets/images/case_studies/made/illustrations/component_placket_regular.svg",
    alt: "An illustrated graphic of a regular placket",
    width: 95,
    height: 96,
  },
  component_placket_tuxedo: {
    name: "component_placket_tuxedo",
    src: "./assets/images/case_studies/made/illustrations/component_placket_tuxedo.svg",
    alt: "An illustrated graphic of a tuxedo placket",
    width: 95,
    height: 96,
  },
  configurator_graphic: {
    name: "configurator_graphic",
    src: "./assets/images/case_studies/made/illustrations/configurator_graphic.svg",
    alt: "An illustrated graphic of an online shirt configurator interface",
    width: 514,
    height: 337,
  },
  requirements_consistency: {
    name: "requirements_consistency",
    src: "./assets/images/case_studies/made/illustrations/requirements_consistency.svg",
    alt: "An illustrated graphic of a target which has been struck in the same place multiple times",
    width: 149,
    height: 149,
  },
  requirements_experimentation: {
    name: "requirements_experimentation",
    src: "./assets/images/case_studies/made/illustrations/requirements_experimentation.svg",
    alt: "An illustrated graphic of yarn, scissors, and a tape measure, representing experimentation in design using clothing related tools as a metaphor",
    width: 147,
    height: 164,
  },
  requirements_photorealism: {
    name: "requirements_photorealism",
    src: "./assets/images/case_studies/made/illustrations/requirements_photorealism.svg",
    alt: "An illustrated graphic of a camera, representing photorealism as a goal for the product",
    width: 137,
    height: 110,
  },
  requirements_scalability: {
    name: "requirements_scalability",
    src: "./assets/images/case_studies/made/illustrations/requirements_scalability.svg",
    alt: "An illustrated graphic of a growing square, representing scalability as a goal for the product",
    width: 131,
    height: 131,
  },
  workflow_composing: {
    name: "workflow_composing",
    src: "./assets/images/case_studies/made/illustrations/workflow_composing.svg",
    alt: "An illustrated graphic of a person in the center of a camera frame",
    width: 124,
    height: 124,
  },
  workflow_compositing: {
    name: "workflow_compositing",
    src: "./assets/images/case_studies/made/illustrations/workflow_compositing.svg",
    alt: "An illustrated graphic of multiple digital layers stacked on top of each other",
    width: 123,
    height: 124,
  },
  workflow_creating_textures: {
    name: "workflow_creating_textures",
    src: "./assets/images/case_studies/made/illustrations/workflow_creating_textures.svg",
    alt: "An abstract illustrated graphic of a 2D UV plane with multiple textures applied to it",
    width: 153,
    height: 154,
  },
  workflow_modeling: {
    name: "workflow_modeling",
    src: "./assets/images/case_studies/made/illustrations/workflow_modeling.svg",
    alt: "An illustrated graphic of a 3D wireframe cube",
    width: 152,
    height: 153,
  },
  workflow_rendering: {
    name: "workflow_rendering",
    src: "./assets/images/case_studies/made/illustrations/workflow_rendering.svg",
    alt: "An illustrated graphic of an old-school cinema film camera",
    width: 134,
    height: 109,
  },
  workflow_scripting: {
    name: "workflow_scripting",
    src: "./assets/images/case_studies/made/illustrations/workflow_scripting.svg",
    alt: "An illustrated graphic of an scroll of paper with '</>' written on it to denote code",
    width: 148,
    height: 137,
  },
  workflow_sculpting: {
    name: "workflow_sculpting",
    src: "./assets/images/case_studies/made/illustrations/workflow_sculpting.svg",
    alt: "An illustrated graphic of physical sculpting tools",
    width: 149,
    height: 123,
  },
  workflow_texturing: {
    name: "workflow_texturing",
    src: "./assets/images/case_studies/made/illustrations/workflow_texturing.svg",
    alt: "An illustrated graphic of a 3D wireframe cube with a texture applied to it",
    width: 123,
    height: 124,
  },
  lighting_after: {
    name: "lighting_after",
    src: "./assets/images/case_studies/made/lighting/lighting_after.png",
    alt: "A high fidelity 3D rendering of a dress shirt with full-bright lighting applied",
    width: 1000,
    height: 1000,
  },
  lighting_before: {
    name: "lighting_before",
    src: "./assets/images/case_studies/made/lighting/lighting_before.png",
    alt: "A high fidelity 3D rendering of a dress shirt with the final lighting applied",
    width: 1000,
    height: 1000,
  },
  lighting_drop: {
    name: "lighting_drop",
    src: "./assets/images/case_studies/made/lighting/lighting_drop.png",
    alt: "A rendering of the previously seen dress shirt's component stacked on top of each other with a generic drop shadow applied to each",
    width: 1000,
    height: 1000,
  },
  sculpting_after: {
    name: "sculpting_after",
    src: "./assets/images/case_studies/made/sculpting/sculpting_after.png",
    alt: "A mat-cap rendering of a dress shirt after imperfections had been sculpted into the model",
    width: 1200,
    height: 1200,
  },
  sculpting_before: {
    name: "sculpting_before",
    src: "./assets/images/case_studies/made/sculpting/sculpting_before.png",
    alt: "A mat-cap rendering of a dress shirt before imperfections had been sculpted into the model",
    width: 1200,
    height: 1200,
  },
  shadow_creation_1_target: {
    name: "shadow_creation_1_target",
    src: "./assets/images/case_studies/made/shadow_creation/shadow_creation_1_target.png",
    alt: "A close up rendering of the cuff resting on top of a dress shirt, with the shirt base behind the cuff being low opacity.",
    width: 1884,
    height: 1884,
    group: "shadow_creation",
  },
  shadow_creation_2_hidden: {
    name: "shadow_creation_2_hidden",
    src: "./assets/images/case_studies/made/shadow_creation/shadow_creation_2_hidden.png",
    alt: "A close up rendering of the location where the cuff would be sitting on top of a dress shirt, with the cuff now being invisible, with only its shadow left in its place",
    width: 1884,
    height: 1884,
    group: "shadow_creation",
  },
  shadow_creation_3_isolated: {
    name: "shadow_creation_3_isolated",
    src: "./assets/images/case_studies/made/shadow_creation/shadow_creation_3_isolated.png",
    alt: "A close up rendering of the location where the cuff would be sitting on top of a dress shirt, with both the cuff and the base shirt behind it now being invisible, leaving only the shadows cast by the cuff, which also form a faint outline of the shirt",
    width: 1884,
    height: 1884,
    group: "shadow_creation",
  },
  shadow_creation_4_edited: {
    name: "shadow_creation_4_edited",
    src: "./assets/images/case_studies/made/shadow_creation/shadow_creation_4_edited.png",
    alt: "A close up rendering of the location where the cuff would be sitting on top of a dress shirt, with both the cuff and the base shirt behind it now being invisible.  The shadows have been post processed to be more crisp and defined, and the shirt outline has been removed. Leaving a perfect shadow that would physically be cast by the cuff onto shirt",
    width: 1884,
    height: 1884,
    group: "shadow_creation",
  },
  shadow_creation_5_combined: {
    name: "shadow_creation_5_combined",
    src: "./assets/images/case_studies/made/shadow_creation/shadow_creation_5_combined.png",
    alt: "A close up rendering of a shirt cuff with a physcially accurate shadow being cast behind it onto a transparent background",
    width: 1884,
    height: 1884,
    group: "shadow_creation",
  },
  shadow_creation_6_final: {
    name: "shadow_creation_6_final",
    src: "./assets/images/case_studies/made/shadow_creation/shadow_creation_6_final.png",
    alt: "a close up rendering of a dress shirt cuff casting a physically accurate shadow onto the shirt base behind it",
    width: 1884,
    height: 1884,
    group: "shadow_creation",
  },
  shirt_row_01: {
    name: "shirt_row_01",
    src: "./assets/images/case_studies/made/shirt_row/shirt_row_01.png",
    alt: "A dark grey dress shirt with stripped contrast fabric, a mini wide collar, regular cuff, and white buttons.",
    width: 1496,
    height: 1496,
    group: "shirt_row",
  },
  shirt_row_02: {
    name: "shirt_row_02",
    src: "./assets/images/case_studies/made/shirt_row/shirt_row_02.png",
    alt: "A dark blue dress shirt with grey contrast fabric, a French cuff, dark buttons, and mini-wide collar.",
    width: 1496,
    height: 1496,
    group: "shirt_row",
  },
  shirt_row_03: {
    name: "shirt_row_03",
    src: "./assets/images/case_studies/made/shirt_row/shirt_row_03.png",
    alt: "A light blue dress shirt with white contrast fabric, a band collar, regular cuff, and light buttons.",
    width: 1496,
    height: 1496,
    group: "shirt_row",
  },
  shirt_row_04: {
    name: "shirt_row_04",
    src: "./assets/images/case_studies/made/shirt_row/shirt_row_04.png",
    alt: "A light blue dress shirt with no contrast fabric, a mini-wide collar, French cuff, light buttons, and regular cuff.",
    width: 1496,
    height: 1496,
    group: "shirt_row",
  },
  shirt_row_05: {
    name: "shirt_row_05",
    src: "./assets/images/case_studies/made/shirt_row/shirt_row_05.png",
    alt: "A very light blue dress shirt with no contrast fabric, a wide collar, French cuff, light buttons, and regular cuff.",
    width: 1496,
    height: 1496,
    group: "shirt_row",
  },
  shirt_row_06: {
    name: "shirt_row_06",
    src: "./assets/images/case_studies/made/shirt_row/shirt_row_06.png",
    alt: "A light grey dress shirt with plaid contrast fabric, a wide collar, regular cuff, and light buttons.",
    width: 1496,
    height: 1496,
    group: "shirt_row",
  },
  texture_creation_1_scan: {
    name: "texture_creation_1_scan",
    src: "./assets/images/case_studies/made/texture_creation/texture_creation_1_scan.png",
    alt: "A high res scan of white and blue stripped fabric",
    width: 1256,
    height: 1256,
    group: "texture_creation",
  },
  texture_creation_2_cropped: {
    name: "texture_creation_2_cropped",
    src: "./assets/images/case_studies/made/texture_creation/texture_creation_2_cropped.png",
    alt: "A high res scan of white and blue stripped fabric, cropped down to only show only a small portion, one grid square, of the fabric",
    width: 1256,
    height: 1256,
    group: "texture_creation",
  },
  texture_creation_3_traced: {
    name: "texture_creation_3_traced",
    src: "./assets/images/case_studies/made/texture_creation/texture_creation_3_traced.png",
    alt: "A high res scan of white and blue stripped fabric, cropped down to only show only a small portion, one grid square, of the fabric, with the grid lines traced over the fabric",
    width: 1256,
    height: 1256,
    group: "texture_creation",
  },
  texture_creation_4_straightened: {
    name: "texture_creation_4_straightened",
    src: "./assets/images/case_studies/made/texture_creation/texture_creation_4_straightened.png",
    alt: "A high res scan of white and blue stripped fabric, cropped down to only show only a small portion, one grid square, of the fabric, now perfectly straight where the previous gridlines had highlighted the fabric's natural imperfections",
    width: 1256,
    height: 1256,
    group: "texture_creation",
  },
  texture_creation_5_repeatable: {
    name: "texture_creation_5_repeatable",
    src: "./assets/images/case_studies/made/texture_creation/texture_creation_5_repeatable.png",
    alt: "A zoomed out view of the previous 'straightened' image, showing that after having now been straightended it could be repeated to create a seamless texture after more modifications in photoshop",
    width: 1256,
    height: 1256,
    group: "texture_creation",
  },
  texture_creation_6_material: {
    name: "texture_creation_6_material",
    src: "./assets/images/case_studies/made/texture_creation/texture_creation_6_material.png",
    alt: "A 3D rendering of a material sample made from the repeating texture created in the previous image",
    width: 1256,
    height: 1256,
    group: "texture_creation",
  },

  configurator_demo: {
    name: "configurator_demo",
    src: "./assets/images/case_studies/made/configurator/configurator_demo.mp4",
    alt: "A live demo video of MADE's dress shirt configuration tool being used on their website.  Powered by the image components created in this study.",
    width: 1438,
    height: 720,
  },

  contrast_split_mini_wide_video: {
    name: "contrast_split_mini_wide_video",
    src: "./assets/images/case_studies/made/contrast_areas/contrast_split_mini_wide_video.webm",
    alt: "A 3D rendering of a mini-wide-collar dress shirt with contrast fabric.  The base fabric is then horizontally wiped away and replaced with a mat-cap texture, leaving only the contrast fabric.  From there, the contrast fabrics begin cycling through a series of different colors and patters.",
    width: 1200,
    height: 1200,
  },

  contrast_split_wide_video: {
    name: "contrast_split_wide_video",
    src: "./assets/images/case_studies/made/contrast_areas/contrast_split_wide_video.webm",
    alt: "A 3D rendering of a wide-collar dress shirt with contrast fabric.  The base fabric is then horizontally wiped away and replaced with a mat-cap texture, leaving only the contrast fabric.  From there, the contrast fabrics begin cycling through a series of different colors and patters.",
    width: 1200,
    height: 1200,
  },

  limitations_bottle: {
    name: "limitations_bottle",
    src: "./assets/images/case_studies/made/limitations/limitations_bottle.mp4",
    alt: "A 3D rendering of a foundation makeup bottle product shot.  The bottle's label reads 'Jabbar & Co.'. The bottle cycles through a series of different skin tone colors to demonstrate how the previously described system was scaleable and was able to be reused in a later project of mine.",
    width: 1200,
    height: 1200,
  },
  limitations_multiple_objects: {
    name: "limitations_multiple_objects",
    src: "./assets/images/case_studies/made/limitations/limitations_multiple_objects.mp4",
    alt: "A motion graphic animation with a dress shirt in center frame.  A camera shutter surrounds it and captures an image of the shirt.  The shirt then slides off frame to the left, and is replaced by a new shirt with a different pattern which comes in from the right. The image is captured once again, and the cycle continues.  This animation represents one potential approach for rendering the shirt components I created for MADE.  The approach was to have a series of identical objects that would each be rendered individually.",
    width: 1200,
    height: 1200,
  },
  limitations_single_object: {
    name: "limitations_single_object",
    src: "./assets/images/case_studies/made/limitations/limitations_single_object.mp4",
    alt: "A motion graphic animation with a dress shirt in center frame.  A camera shutter surrounds it and captures an image of the shirt.  The shirt then undergoes a wipe transition from top to bottom and its color/pattern changes. The image is captured once again, and the cycle continues.  This animation represents one potential approach for rendering the shirt components I created for MADE. The approach was to have a single object that would be able to dynamically change its pattern every frame.  Meaning the 3D scene only had one object, rather than a series of identical objects.",
    width: 1200,
    height: 1200,
  },
  limitations_switcher: {
    name: "limitations_switcher",
    src: "./assets/images/case_studies/made/limitations/limitations_switcher.mp4",
    alt: "A motion graphic animation which describes the underlying system used to power the second approach described above, the approach with only one shirt which can change its pattern.  The animation shows 3 nodes on the left side of the screen, each representing a different pattern.  The three nodes are plugged into a much larger center node titled 'Switcher'.  The switcher node is then plugged into the shirt object on the right side of the animation.  Even though all 3 pattern nodes on the left are plugged into the switcher, only the first has a 'live' connection which is fully opaque compared to the rest.  This was decided by a numeric dial on the switcher node which currently reads '1'.  As a result, the switcher assigns the first material to the shirt.  The animation is then built around the numeric dial being changed to '2' and '3' to show how with each value change, a different pattern in the sequence is selected and assigned to the shirt.",
    width: 2400,
    height: 1200,
  },
  contrast_glow_mini_wide_fabric_video: {
    name: "contrast_glow_mini_wide_fabric_video",
    src: "./assets/images/case_studies/made/contrast_areas/contrast_glow_mini_wide_fabric_video.webm",
    alt: "A 3D rendering of a shirt model with a wide collar where the inner fabric of the collar and cuff is pulsing with white light to act as a visual guide for what a contrast fabric is and where they are located",
    width: 1000,
    height: 1000,
  },
  contrast_glow_wide_fabric_video: {
    name: "contrast_glow_wide_fabric_video",
    src: "./assets/images/case_studies/made/contrast_areas/contrast_glow_wide_fabric_video.webm",
    alt: "A 3D rendering of a shirt model with a wide collar where the inner fabric of the collar and cuff is pulsing with white light to act as a visual guide for what a contrast fabric is and where they are located",
    width: 1000,
    height: 1000,
  },
  contrast_glow_mini_wide_metal_video: {
    name: "contrast_glow_mini_wide_metal_video",
    src: "./assets/images/case_studies/made/contrast_areas/contrast_glow_mini_wide_metal_video.webm",
    alt: "A 3D mat-cap rendering of a shirt model with a mini wide collar where the inner fabric of the collar and cuff is pulsing with white light to act as a visual guide for what a contrast fabric is and where they are located",
    width: 1000,
    height: 1000,
  },
  contrast_glow_wide_metal_video: {
    name: "contrast_glow_wide_metal_video",
    src: "./assets/images/case_studies/made/contrast_areas/contrast_glow_wide_metal_video.webm",
    alt: "A mat-cap 3D rendering of a shirt model with a wide collar where the inner fabric of the collar and cuff is pulsing with white light to act as a visual guide for what a contrast fabric is and where they are located",
    width: 1000,
    height: 1000,
  },
}, "made");

const MADE_IMG_GROUPS = processGroups(MADE_IMGS);

export { MADE_IMGS, MADE_IMG_GROUPS };
