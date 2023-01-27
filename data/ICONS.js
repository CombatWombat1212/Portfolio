


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
  chevron_down: {
    name: 'chevron_down',
    src: "/assets/icons/chevron_down.svg",
    alt: "Chevron pointing down",
    width: 17.84,
    height: 11.75,
  },
  chevron_right: {
    name: 'chevron_right',
    src: "/assets/icons/chevron_right.svg",
    alt: "Chevron pointing right",
    width: 19,
    height: 30,
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
const arrow_down = new Icon(ICONS.arrow_down)
const chevron_down = new Icon(ICONS.chevron_down)
const document = new Icon(ICONS.document)
const email = new Icon(ICONS.email)
const instagram = new Icon(ICONS.instagram)
const linkedin = new Icon(ICONS.linkedin)

export default ICONS
export { arrow_right, arrow_left, arrow_down, chevron_down, document, email, instagram, linkedin }
  


