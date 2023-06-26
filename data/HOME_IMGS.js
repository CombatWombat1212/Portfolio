import { processGroups, processImages } from "@/scripts/ProcessImages";

const HOME_IMGS = processImages(
  {
    makeright_main: {
      src: "/assets/images/home/MakeRight.png",
      alt: "3D printed plastic elephant diving into a cardboard box",
      width: 1038,
      height: 944,
    },

    makeright_alt: {
      src: "/assets/images/home/MakeRight_Alt.png",
      alt: "3D printed plastic elephant sitting in a cardboard box",
      width: 1038,
      height: 716,
    },

    made_main: {
      src: "/assets/images/home/MADE.png",
      alt: "3D rendering of a blue dress-shirt",
      width: 788,
      height: 1232,
    },

    koalako_main: {
      src: "/assets/images/home/KoalaKo.png",
      alt: "3D rendering of a phone with an app called 'KoalaKo' open on the screen",
      width: 1106,
      height: 1262,
    },

    explorations_main: {
      src: "/assets/images/home/Explorations.png",
      alt: "3D rendering of a worn steel compass",
      width: 730,
      height: 1626,
    },

    explorations_alt: {
      src: "/assets/images/home/Explorations_Alt.png",
      alt: "3D rendering of a worn steel compass on its side",
      width: 730,
      height: 1626,
    },
  },
  "home"
);

const HOME_IMG_GROUPS = processGroups(HOME_IMGS);

export { HOME_IMGS, HOME_IMG_GROUPS };
