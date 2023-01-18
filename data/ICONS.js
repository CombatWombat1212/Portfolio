


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
  


