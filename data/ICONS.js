


const ICONS = {
  arrow_right: {
    name: 'arrow_right',
    src: "/assets/icons/arrow_right.svg",
    alt: "Arrow pointing right",
    width: 448,
    height: 384.15,
  },
  arrow_left: {
    name: 'arrow_left',
    src: "/assets/icons/arrow_left.svg",
    alt: "Arrow pointing left",
    width: 448,
    height: 384.15,
  },
  arrow_down: {
    name: 'arrow_down',
    src: "/assets/icons/arrow_down.svg",
    alt: "Arrow pointing down",
    width: 384,
    height: 447.98,
  },
  document: {
    name: 'document',
    src: "/assets/icons/document.svg",
    alt: "Icon of a text document",
    width: 384,
    height: 512,
  },
  email: {
    name: 'email',
    src: "/assets/icons/email.svg",
    alt: "Envelope icon",
    width: 512,
    height: 384,
  },
  instagram: {
    name: 'instagram',
    src: "/assets/icons/instagram.svg",
    alt: "Instagram logo",
    width: 448,
    height: 448.15,
  },
  linkedin: {
    name: 'linkedin',
    src: "/assets/icons/linkedin.svg",
    alt: "LinkedIn logo",
    width: 448,
    height: 448,
  },




};


function Icon(icon){
    this.name = icon.name,
    this.src = icon.src,
    this.alt = icon.alt,
    this.width = icon.width,
    this.height = icon.height
}
  

const arrow_right = new Icon(ICONS.arrow_right)
const arrow_left = new Icon(ICONS.arrow_left)

export default ICONS
export {arrow_right, arrow_left}
  


