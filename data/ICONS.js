


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
  chevron_left: {
    name: 'chevron_left',
    src: "/assets/icons/chevron_left.svg",
    alt: "Chevron pointing left",
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



  close: {
    name: 'close',
    src: "/assets/icons/close.svg",
    alt: "Close icon",
    width: 28.46,
    height: 28.46,
  },
  plus: {
    name: 'plus',
    src: "/assets/icons/plus.svg",
    alt: "Plus icon",
    width: 19.5,
    height: 19.5,
  },
  minus: {
    name: 'minus',
    src: "/assets/icons/minus.svg",
    alt: "Minus icon",
    width: 19.5,
    height: 3,
  },


  loading: {
    name: 'loading',
    src: "../assets/loading/loading_spinner.svg",
    alt: "Spinning loading icon",
    width: 100,
    height: 100,
  },


  checkmark: {
    name: "checkmark",
    src: "/assets/icons/checkmark.svg",
    alt: "",
    width: 22,
    height: 17,
  },
    xmark: {
    name: "xmark",
    src: "/assets/icons/xmark.svg",
    alt: "",
    width: 17,
    height: 17,
  },

  user: {
    name: "user",
    src: "/assets/icons/user.svg",
    alt: "",
    width: 448,
    height: 512,
  },



};


function Icon(icon){
    this.name = icon.name,
    this.src = icon.src,
    this.alt = icon.alt,
    this.width = icon.width,
    this.height = icon.height
}
  

const arrow_right = new Icon(ICONS.arrow_right);
const arrow_left = new Icon(ICONS.arrow_left);
const arrow_down = new Icon(ICONS.arrow_down);
const chevron_down = new Icon(ICONS.chevron_down);
const chevron_right = new Icon(ICONS.chevron_right);
const chevron_left = new Icon(ICONS.chevron_right);
const document = new Icon(ICONS.document);
const email = new Icon(ICONS.email);
const instagram = new Icon(ICONS.instagram);
const linkedin = new Icon(ICONS.linkedin);

const loading = new Icon(ICONS.loading);
const checkmark = new Icon(ICONS.checkmark);
const xmark = new Icon(ICONS.xmark);


export default ICONS
export { arrow_right, arrow_left, arrow_down, chevron_down, chevron_right,chevron_left, document, email, instagram, linkedin, loading, checkmark, xmark }
  


