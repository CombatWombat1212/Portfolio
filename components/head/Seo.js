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
  return (
    <Head>
      <title>{title}</title>
      <Meta name="description" content={description} />
      <Meta name="keywords" content={keywords} />
    </Head>
  );
}

function Preview({ page }) {
  const { title, description, img, imgUrl, url } = page;
  return (
    <Head>
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content={url} />
      <Meta property="og:title" content={title} />
      <Meta property="og:image:type" content="image/png" />
      <Meta property="og:image:width" content={img.width} />
      <Meta property="og:image:height" content={img.height} />
      <Meta property="og:image:alt" content={img.alt} />
      <Meta property="og:image" name="image" content={imgUrl} />
      <Meta key="og:description" property="og:description" content={description} />
      <Meta key="og:site_name" property="og:site_name" content={SEO_DATA["home"].title} />

      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={description} />
      <Meta name="twitter:image" content={imgUrl} />
      <Meta name="twitter:image:alt" content={img.alt} />
    </Head>
  );
}

const Meta = ({ name, content, property }) => (
  <meta key={name || property} {...(name ? { name: name } : {})} {...(property ? { property: property } : {})} content={content} />
);

export default Seo;
