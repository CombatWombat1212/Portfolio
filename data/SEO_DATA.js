const { ABOUT_IMGS } = require("./ABOUT_IMGS");






const SEO_DATA = processSeoData({
  home: {
    title: "Sam Giustizia | Multidisciplinary Designer",
    description:
      "Explore the universe and community of Hogeman.  View our speedrun leaderboard, and try to get the best time. Get started now and dive into this 8-bit adventure!",
    keywords: "Cryptic Pixel, Pixel Art, Pixel art icons, Crypto Game, Blockchain games",
    img: ABOUT_IMGS.me,
    url: "/",
  },
  

});



function processSeoData(seo) {


  for (let page in seo) {

    seo[page].url = "https://www.samgiustizia.ca" + seo[page].url;
    seo[page].imgUrl = "https://www.samgiustizia.ca" + seo[page].img.src.replace(".", "");

  }



  return seo;
}






export default SEO_DATA;