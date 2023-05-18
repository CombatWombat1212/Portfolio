// DEPRECATED

// import { useState } from "react";
// import { useMountEffect } from "@/scripts/hooks/useMountEffect";

// const useRandomCaptions = (captions, len) => {
//   const [chosen, setChosen] = useState([]);

//   const getRandomUniqueCaptions = (captions, len) => {
//     var count = len;
//     if (count > captions.length) {
//       throw new Error("count should be less than or equal to the number of captions");
//     }
//     const shuffledCaptions = [...captions].sort(() => 0.5 - Math.random());
//     return shuffledCaptions.slice(0, count);
//   };

//   useMountEffect(() => {
//     setChosen(getRandomUniqueCaptions(captions, len));
//   }, []);

//   return chosen;
// };

// export default useRandomCaptions;
