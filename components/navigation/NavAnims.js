import { motion } from "framer-motion";

const navAnims = {
    slide: {
      in: {
        initial: { x: "100%" },
        animate: { x: "0%" },
        transition: { type: "spring", stiffness: 100, damping: 20 },
      },
      out: {
        animate: { x: "0%" },
        exit: { x: "100%" },
        transition: { type: "spring", stiffness: 100, damping: 20 },
      },
    },
  };
  
  
  export default navAnims;