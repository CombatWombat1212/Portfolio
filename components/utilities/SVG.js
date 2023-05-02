// import React, { useState, useEffect, useRef } from 'react';

// const SVG = ({ img, className, outline }) => {
//   const [svgContent, setSvgContent] = useState(null);
//   const wrapperRef = useRef(null);

//   const fetchSvg = async () => {
//     try {
//       const response = await fetch(img.src);
//       const svgText = await response.text();

//       // Create a DOM parser to parse the SVG content
//       const parser = new DOMParser();
//       const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

//       // Add the 'svg' className to the <svg> element
//       const svgEl = svgDoc.querySelector('svg');
//       svgEl.classList.add('svg');
      
//       if (outline && wrapperRef.current) {
//           const filterId = 'outline-' + Math.random().toString(36).substr(2, 9);
          
//           // Get the actual values of the CSS variables
//           const actualFill = getComputedStyle(wrapperRef.current).getPropertyValue(outline.fill);
//           const actualWeight = getComputedStyle(wrapperRef.current).getPropertyValue(outline.weight).split('px')[0];



                    
//         // Add the filter definition
//         const filter = `
//           <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
//             <feFlood flood-color="${actualFill.trim()}" result="flood" />
//             <feComposite in="flood" in2="SourceGraphic" operator="in" result="mask" />
//             <feMorphology in="mask" operator="dilate" radius="${actualWeight.trim()}" result="mask" />
//             <feComposite in="mask" in2="SourceGraphic" operator="out" result="outline" />
//             <feMerge>
//               <feMergeNode in="outline" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>
//         `;
//         const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
//         defs.innerHTML = filter;
//         svgEl.insertBefore(defs, svgEl.firstChild);

//         // Apply the filter to the SVG element
//         svgEl.setAttribute('style', `filter: url(#${filterId})`);
//       }

//       // Serialize the updated SVG content
//       const serializer = new XMLSerializer();
//       const updatedSvgText = serializer.serializeToString(svgEl);

//       setSvgContent(updatedSvgText);
//     } catch (error) {
//       console.error('Error fetching SVG:', error);
//     }
//   };

//   useEffect(() => {
//     fetchSvg();
//   }, [img.src, outline]);

//   if (!svgContent) {
//     return null;
//   }

//   return (
//     <div
//       ref={wrapperRef}
//       className={`svg--wrapper ${className || ''}`}
//       dangerouslySetInnerHTML={{ __html: svgContent }}
//       width={img.width}
//       height={img.height}
//       style={{
//         [`--svg-aspect-width`]: img.width,
//         [`--svg-aspect-height`]: img.height,
//         [`--sw`]: `${img.width / 16}rem`,
//         [`--sh`]: `${img.height / 16}rem`,
//       }}
//       aria-label={img.alt}
//       role="img"
//     />
//   );
// };

// export default SVG;
