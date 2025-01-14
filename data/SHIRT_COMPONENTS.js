const { processImages, processGroups } = require("@/scripts/ProcessImages");

const SHIRT_COMPONENTS = processImages({
  base_shirt_755027: {
    name:"base_shirt_755027",
    src: "/assets/images/made/complete_shirts/755027/755027_Base_Shirt.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a base shirt in a material known as '755027'",
    group: "755027",
  },
  collar_band_755027: {
    name:"collar_band_755027",
    src: "/assets/images/made/complete_shirts/755027/755027_Collar_Band.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a band collar in a material known as '755027'",
    group: "755027",
  },
  collar_mini_wide_755027: {
    name:"collar_mini_wide_755027",
    src: "/assets/images/made/complete_shirts/755027/755027_Collar_Mini_Wide.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a mini wide collar in a material known as '755027'",
    group: "755027",
  },
  collar_wide_755027: {
    name:"collar_wide_755027",
    src: "/assets/images/made/complete_shirts/755027/755027_Collar_Wide.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a wide collar in a material known as '755027'",
    group: "755027",
  },
  cuff_regular_755027: {
    name:"cuff_regular_755027",
    src: "/assets/images/made/complete_shirts/755027/755027_Cuff_1_Button_Angle.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a regular cuff in a material known as '755027'",
    group: "755027",
  },
  cuff_french_755027: {
    name:"cuff_french_755027",
    src: "/assets/images/made/complete_shirts/755027/755027_Cuff_French.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a french cuff in a material known as '755027'",
    group: "755027",
  },
  thumbnail_755027: {
    name:"thumbnail_755027",
    src: "/assets/images/made/complete_shirts/755027/755027_Fabric_Thumbnail.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a fabric thumbnail in a material known as '755027'",
    group: "755027",
  },
  placket_hidden_755027: {
    name:"placket_hidden_755027",
    src: "/assets/images/made/complete_shirts/755027/755027_Placket_Hidden.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a hidden placket in a material known as '755027'",
    group: "755027",
  },
  placket_regular_755027: {
    name:"placket_regular_755027",
    src: "/assets/images/made/complete_shirts/755027/755027_Placket_Regular.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a regular placket in a material known as '755027'",
    group: "755027",
  },
  placket_tuxedo_755027: {
    name:"placket_tuxedo_755027",
    src: "/assets/images/made/complete_shirts/755027/755027_Placket_Tuxedo.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a tuxedo placket in a material known as '755027'",
    group: "755027",
  },
  base_shirt_755032: {
    name:"base_shirt_755032",
    src: "/assets/images/made/complete_shirts/755032/755032_Base_Shirt.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a base shirt in a material known as '755032'",
    group: "755032",
  },
  collar_band_755032: {
    name:"collar_band_755032",
    src: "/assets/images/made/complete_shirts/755032/755032_Collar_Band.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a band collar in a material known as '755032'",
    group: "755032",
  },
  collar_mini_wide_755032: {
    name:"collar_mini_wide_755032",
    src: "/assets/images/made/complete_shirts/755032/755032_Collar_Mini_Wide.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a mini wide collar in a material known as '755032'",
    group: "755032",
  },
  collar_wide_755032: {
    name:"collar_wide_755032",
    src: "/assets/images/made/complete_shirts/755032/755032_Collar_Wide.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a wide collar in a material known as '755032'",
    group: "755032",
  },
  cuff_regular_755032: {
    name:"cuff_regular_755032",
    src: "/assets/images/made/complete_shirts/755032/755032_Cuff_1_Button_Angle.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a regular cuff in a material known as '755032'",
    group: "755032",
  },
  cuff_french_755032: {
    name:"cuff_french_755032",
    src: "/assets/images/made/complete_shirts/755032/755032_Cuff_French.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a french cuff in a material known as '755032'",
    group: "755032",
  },
  thumbnail_755032: {
    name:"thumbnail_755032",
    src: "/assets/images/made/complete_shirts/755032/755032_Fabric_Thumbnail.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a fabric thumbnail in a material known as '755032'",
    group: "755032",
  },
  placket_hidden_755032: {
    name:"placket_hidden_755032",
    src: "/assets/images/made/complete_shirts/755032/755032_Placket_Hidden.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a hidden placket in a material known as '755032'",
    group: "755032",
  },
  placket_regular_755032: {
    name:"placket_regular_755032",
    src: "/assets/images/made/complete_shirts/755032/755032_Placket_Regular.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a regular placket in a material known as '755032'",
    group: "755032",
  },
  placket_tuxedo_755032: {
    name:"placket_tuxedo_755032",
    src: "/assets/images/made/complete_shirts/755032/755032_Placket_Tuxedo.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a tuxedo placket in a material known as '755032'",
    group: "755032",
  },
  base_shirt_755039: {
    name:"base_shirt_755039",
    src: "/assets/images/made/complete_shirts/755039/755039_Base_Shirt.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a base shirt in a material known as '755039'",
    group: "755039",
  },
  collar_band_755039: {
    name:"collar_band_755039",
    src: "/assets/images/made/complete_shirts/755039/755039_Collar_Band.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a band collar in a material known as '755039'",
    group: "755039",
  },
  collar_mini_wide_755039: {
    name:"collar_mini_wide_755039",
    src: "/assets/images/made/complete_shirts/755039/755039_Collar_Mini_Wide.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a mini wide collar in a material known as '755039'",
    group: "755039",
  },
  collar_wide_755039: {
    name:"collar_wide_755039",
    src: "/assets/images/made/complete_shirts/755039/755039_Collar_Wide.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a wide collar in a material known as '755039'",
    group: "755039",
  },
  cuff_regular_755039: {
    name:"cuff_regular_755039",
    src: "/assets/images/made/complete_shirts/755039/755039_Cuff_1_Button_Angle.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a regular cuff in a material known as '755039'",
    group: "755039",
  },
  cuff_french_755039: {
    name:"cuff_french_755039",
    src: "/assets/images/made/complete_shirts/755039/755039_Cuff_French.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a french cuff in a material known as '755039'",
    group: "755039",
  },
  thumbnail_755039: {
    name:"thumbnail_755039",
    src: "/assets/images/made/complete_shirts/755039/755039_Fabric_Thumbnail.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a fabric thumbnail in a material known as '755039'",
    group: "755039",
  },
  placket_hidden_755039: {
    name:"placket_hidden_755039",
    src: "/assets/images/made/complete_shirts/755039/755039_Placket_Hidden.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a hidden placket in a material known as '755039'",
    group: "755039",
  },
  placket_regular_755039: {
    name:"placket_regular_755039",
    src: "/assets/images/made/complete_shirts/755039/755039_Placket_Regular.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a regular placket in a material known as '755039'",
    group: "755039",
  },
  placket_tuxedo_755039: {
    name:"placket_tuxedo_755039",
    src: "/assets/images/made/complete_shirts/755039/755039_Placket_Tuxedo.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a tuxedo placket in a material known as '755039'",
    group: "755039",
  },
  base_shirt_canvas_5: {
    name:"base_shirt_canvas_5",
    src: "/assets/images/made/complete_shirts/Canvas_5/Canvas_5_Base_Shirt.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a base shirt in a material known as 'canvas 5'",
    group: "canvas_5",
  },
  collar_band_canvas_5: {
    name:"collar_band_canvas_5",
    src: "/assets/images/made/complete_shirts/Canvas_5/Canvas_5_Collar_Band.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a band collar in a material known as 'canvas 5'",
    group: "canvas_5",
  },
  collar_mini_wide_canvas_5: {
    name:"collar_mini_wide_canvas_5",
    src: "/assets/images/made/complete_shirts/Canvas_5/Canvas_5_Collar_Mini_Wide.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a mini wide collar in a material known as 'canvas 5'",
    group: "canvas_5",
  },
  collar_wide_canvas_5: {
    name:"collar_wide_canvas_5",
    src: "/assets/images/made/complete_shirts/Canvas_5/Canvas_5_Collar_Wide.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a wide collar in a material known as 'canvas 5'",
    group: "canvas_5",
  },
  cuff_regular_canvas_5: {
    name:"cuff_regular_canvas_5",
    src: "/assets/images/made/complete_shirts/Canvas_5/Canvas_5_Cuff_1_Button_Angle.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a regular cuff in a material known as 'canvas 5'",
    group: "canvas_5",
  },
  cuff_french_canvas_5: {
    name:"cuff_french_canvas_5",
    src: "/assets/images/made/complete_shirts/Canvas_5/Canvas_5_Cuff_French.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a french cuff in a material known as 'canvas 5'",
    group: "canvas_5",
  },
  thumbnail_canvas_5: {
    name:"thumbnail_canvas_5",
    src: "/assets/images/made/complete_shirts/Canvas_5/Canvas_5_Fabric_Thumbnail.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a fabric thumbnail in a material known as 'canvas 5'",
    group: "canvas_5",
  },
  placket_hidden_canvas_5: {
    name:"placket_hidden_canvas_5",
    src: "/assets/images/made/complete_shirts/Canvas_5/Canvas_5_Placket_Hidden.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a hidden placket in a material known as 'canvas 5'",
    group: "canvas_5",
  },
  placket_regular_canvas_5: {
    name:"placket_regular_canvas_5",
    src: "/assets/images/made/complete_shirts/Canvas_5/Canvas_5_Placket_Regular.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a regular placket in a material known as 'canvas 5'",
    group: "canvas_5",
  },
  placket_tuxedo_canvas_5: {
    name:"placket_tuxedo_canvas_5",
    src: "/assets/images/made/complete_shirts/Canvas_5/Canvas_5_Placket_Tuxedo.png",
    width: 1200,
    height: 1200,
    alt: "A 3D rendering of a tuxedo placket in a material known as 'canvas 5'",
    group: "canvas_5",
  },
});



const SHIRT_COMPONENTS_GROUPS = processGroups(SHIRT_COMPONENTS);

export { SHIRT_COMPONENTS, SHIRT_COMPONENTS_GROUPS };