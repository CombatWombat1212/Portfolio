function myImageLoader({ src, width, quality }) {
  return `.${src}?w=${width}&q=${quality || 90}`;
}

export default myImageLoader;
