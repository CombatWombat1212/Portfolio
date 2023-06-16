import { useEffect, useState } from 'react';

function useFont(fonts) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const fontPromises = Array.isArray(fonts) ? fonts : [fonts];
        
        await Promise.all(
          fontPromises.map(({ fontName, src, format = 'woff' }) => {
            const font = new FontFace(fontName, `url(${src}) format('${format}')`);
            if ("fonts" in document) {
              return font.load().then(() => document.fonts.add(font));
            } else { // Fallback to Font Face Observer
              const observer = new FontFaceObserver(fontName);
              return observer.load();
            }
          })
        );
        
        setFontsLoaded(true);
      } catch(err) {
        console.error(err);
      }
    };
    
    loadFonts();
  }, [fonts]);

  return fontsLoaded;
}

export default useFont;