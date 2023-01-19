import { v4 as uuidv4 } from "uuid";





// TODO: Figure out the final list of elements under the 'explorations' section, its a max of 3, but should there be some way of showing the ones that arent included? should they rotate or change page by page? or if thats too complicated they can just be the three

var FOOTER_SITEMAP_ITEMS = [

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
        link: "/",
        key: '',
      },
    ]
  },

  {
    name: "Case Studies",
    link: "/",
    key: '',
    list: [
      {
        name: "MakeRight",
        link: "/MakeRight",
        key: '',
      },
      {
        name: "MADE Clothing",
        link: "/MADE",
        key: '',
      },
      {
        name: "KoalaKo",
        link: "/KoalaKo",
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
        name: "Frontend Dev",
        link: "/",
        key: '',
      },
      {
        name: "3D Design",
        link: "/",
        key: '',
      },
      {
        name: "Motion Graphics",
        link: "/",
        key: '',
      },
      {
        name: "UX/UI Design",
        link: "/",
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
    }
  });


  return arr;
}

export default footerSitemapItemsInit(FOOTER_SITEMAP_ITEMS);
