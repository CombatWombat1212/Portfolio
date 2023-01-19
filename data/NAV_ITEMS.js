import { v4 as uuidv4 } from "uuid";

const NAV_ITEMS = [
  {
    name: "Home",
    text: "Sam Giustizia",
    link: "/",
    type: "Logo",
    ariaLabel: 'Home',
    key: uuidv4(),
  },
  {
    name: "Case Studies",
    text: "Case Studies",
    link: "/",
    type: "Link",
    ariaLabel: 'View case studies',
    key: uuidv4(),
  },
  {
    name: "Explorations",
    text: "Explorations",
    link: "/Explorations",
    type: "Link",
    ariaLabel: 'Visit the explorations page',
    key: uuidv4(),
  },
  {
    name: "About",
    text: "About",
    link: "/About",
    type: "Link",
    ariaLabel: 'Visit the about page',
    key: uuidv4(),
  },
];

export default NAV_ITEMS;




