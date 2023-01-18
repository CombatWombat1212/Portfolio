


function myImageLoader({ src, width, quality }) {
    
    return (
        `.${src}?w=${width}&q=${quality || 100}`
        );

}


export default  myImageLoader;
  

