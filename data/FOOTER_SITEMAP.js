import { v4 as uuidv4 } from "uuid";


var footer_sitemap = [

  {
    name: "Sam Giustizia",
    link: "/",
    key: '',
    list: [
      {
        name: "About",
        link: "/About",
        key: '',
      },
      {
        name: "Resume",
        link: "/Resume",
        key: '',
        target: "_blank",
      },
    ]
  },

  {
    name: "Case Studies",
    link: "/#MakeRight",
    key: '',
    list: [
      {
        name: "MakeRight",
        link: "/Studies/MakeRight",
        key: '',
      },
      {
        name: "MADE Clothing",
        link: "/Studies/MADE",
        key: '',
      },
      {
        name: "KoalaKo",
        link: "/Studies/KoalaKo",
        key: '',
      },
    ]
  },


  {
    name: "Explorations",
    link: "/Explorations",
    key: '',
    list: [
      {
        name: "UX Engineering",
        link: "/Explorations#UX-Engineering",
        key: '',
      },
      {
        name: "UX/UI Design",
        link: "/Explorations#UX-Design",
        key: '',
      },
      {
        name: "3D Design",
        link: "/Explorations#3D-Design",
        key: '',
      },
      {
        name: "Motion Graphics",
        link: "/Explorations#Motion-Graphics",
        key: '',
      },
      {
        name: "Photography",
        link: "/",
        key: '',
      },
    ]
  },





  
];



function footerSitemapItemsInit(arr){

  arr.forEach((item) => {
    item.key = uuidv4();

    if(!item.list) return;
    var list = item.list;
    for(var i = 0; i < list.length; i++){
      list[i].key = uuidv4();
      if(!list[i].target) list[i].target = "_self";
    }
  });


  return arr;
}


const FOOTER_SITEMAP_ITEMS = footerSitemapItemsInit(footer_sitemap);

export default FOOTER_SITEMAP_ITEMS;
