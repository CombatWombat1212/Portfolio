import { processGroups, processImages } from "@/scripts/ProcessImages";

const ABOUT_IMGS = processImages(
  {
    me: {
      name: "me",
      src: "./assets/images/case_studies/about/banner/me.png",
      alt: "Photograph of Sam Giustizia smiling, taken from a top down perspective while he's in some kind of outdoor concrete room",
      width: 2116,
      height: 2248,
    },
    experience_made: {
      name: "experience_made",
      src: "./assets/images/case_studies/about/illustrations/experience/experience_made.svg",
      alt: "MADE Clothing Co. logo",
      width: 188,
      height: 142,
    },
    experience_prepr: {
      name: "experience_prepr",
      src: "./assets/images/case_studies/about/illustrations/experience/experience_prepr.svg",
      alt: "Prepr logo",
      width: 214,
      height: 129,
    },
    experience_sheridan: {
      name: "experience_sheridan",
      src: "./assets/images/case_studies/about/illustrations/experience/experience_sheridan.svg",
      alt: "Sheridan College logo",
      width: 118,
      height: 167,
    },
    experience_vp: {
      name: "experience_vp",
      src: "./assets/images/case_studies/about/illustrations/experience/experience_vp.svg",
      alt: "Virtual Pangea logo",
      width: 151,
      height: 166,
    },
    interests_animation: {
      name: "interests_animation",
      src: "./assets/images/case_studies/about/illustrations/interests/interests_animation.svg",
      alt: "An svg illustration of Gary the Snail from Spongebob Squarepants",
      width: 144,
      height: 130,
    },
    interests_gaming: {
      name: "interests_gaming",
      src: "./assets/images/case_studies/about/illustrations/interests/interests_gaming.svg",
      alt: "An svg illustration of a mushroom from Mario",
      width: 122,
      height: 121,
    },
    interests_music: {
      name: "interests_music",
      src: "./assets/images/case_studies/about/illustrations/interests/interests_music.svg",
      alt: "An svg illustration of a vinyl record",
      width: 118,
      height: 122,
    },
    interests_walks: {
      name: "interests_walks",
      src: "./assets/images/case_studies/about/illustrations/interests/interests_walks.svg",
      alt: "An svg illustration of a sunny hill in a forest",
      width: 138,
      height: 137,
    },
  },

  "about"
);



export { ABOUT_IMGS };
