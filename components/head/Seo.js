import SEO_DATA from "@/data/SEO_DATA";
import Head from "next/head";

function Seo({ page: pageName }) {
  const page = SEO_DATA[pageName];
  return (
    <>
      <Info page={page} />
      <Preview page={page} />
    </>
  );
}

function Info({ page }) {
  const { title, description, keywords } = page;

  const Meta = ({ name, content, property }) => (
    <meta key={name || property} {...(name ? { name: name } : {})} {...(property ? { property: property } : {})} content={content} />
  );

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  );

  
}

function Preview({ page }) {
  const { title, description, img, imgUrl, url } = page;
  return (

    
    <Head>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={img.width} />
      <meta property="og:image:height" content={img.height} />
      <meta property="og:image:alt" content={img.alt} />
      <meta property="og:image" name="image" content={imgUrl} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:site_name" property="og:site_name" content={SEO_DATA["home"].title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
      <meta name="twitter:image:alt" content={img.alt} />
    </Head>
  );

  
}



// const Meta = ({ name, content, property }) => (
//     <meta key={name || property} {...(name ? { name: name } : {})} {...(property ? { property: property } : {})} content={content} />
//   );


export default Seo;
