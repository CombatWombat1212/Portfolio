import { processImage } from "@/scripts/ProcessImages";

const MADE_IMGS = {
//   full_potential: {
//     name: "full_potential",
//     src: "./assets/images/case_studies/makeright/full_potential.svg",
//     alt: "3D printer in the shape of a pad lock",
//     width: 212.28,
//     height: 283,
//   },
//   barriers_to_entry: {
//     name: "barriers_to_entry",
//     src: "./assets/images/case_studies/makeright/barriers_to_entry.svg",
//     alt: "Gate / barrier with the symbols for knowledge, and money",
//     width: 360.84,
//     height: 330.02,
//   },







};

const MADE_IMG_GROUPS = processImage(MADE_IMGS);

export { MADE_IMGS, MADE_IMG_GROUPS };