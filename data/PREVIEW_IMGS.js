import { processGroups, processImages } from "@/scripts/ProcessImages";

const PREVIEW_IMGS = processImages({
    explorations: {
        name: "Explorations",
        src: "/assets/images/thumbnails/Explorations.jpg",
        alt: "3D rendering of a worn steel compass",
        width: 1200,
        height: 600,
      },
      me: {
        name: "Me",
        src: "/assets/images/thumbnails/Me.jpg",
        alt: "Photograph of Sam Giustizia smiling, taken from a top down perspective while he's in some kind of outdoor concrete room",
        width: 1200,
        height: 600,
      },
      koalako: {
        name: "KoalaKo",
        src: "/assets/images/thumbnails/KoalaKo.jpg",
        alt: "3D rendering of a phone with an app called 'KoalaKo' open on the screen",
        width: 1200,
        height: 600,
      },
      made: {
        name: "MADE",
        src: "/assets/images/thumbnails/MADE.jpg",
        alt: "3D rendering of a blue dress-shirt",
        width: 1200,
        height: 600,
      },
      makeright: {
        name: "MakeRight",
        src: "/assets/images/thumbnails/MakeRight.jpg",
        alt: "3D printed plastic elephant diving into a cardboard box",
        width: 1200,
        height: 600,
      },
    
  },
  "preview"
);

export { PREVIEW_IMGS };
