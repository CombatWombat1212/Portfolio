import { v4 as uuidv4 } from "uuid";
import CASE_STUDIES from "./CASE_STUDIES";

var NAV_ITEMS = [
  {
    name: "Home",
    text: "Sam Giustizia",
    link: "/#Home",
    type: "Logo",
    ariaLabel: "Home",
  },
  {
    name: "Case Studies",
    text: "Case Studies",
    link: "/",
    type: "Link",
    ariaLabel: "View case studies",
    dropdown: CASE_STUDIES.filter((item) => item.id !== "Explorations"),
  },
  {
    name: "Explorations",
    text: "Explorations",
    link: "/Explorations",
    type: "Link",
    ariaLabel: "Visit the explorations page",
  },
  {
    name: "About",
    text: "About",
    link: "/About",
    type: "Link",
    ariaLabel: "Visit the about page",
  },
];

function navItemsInit(arr) {
  arr.forEach((item) => (item.key = uuidv4()));
  return arr;
}

export default navItemsInit(NAV_ITEMS);
