const popSeekDuration = 0.175;
const popLayoutTransition = 0.45;
// const popSeekDuration = 0.315;


const popAnims = {
    bounceFade: {
      in: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.25 },
      },
  
      out: {
        animate: { opacity: 0, scale: 0.95 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.25 },
      },
    },
    fade: {
      in: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.15 },
      },
  
      out: {
        animate: { opacity: 0 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      },
    },
    hideUI: {
      in: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 },
      },
      out: {
        animate: { opacity: 0 },
        exit: { opacity: 0 },
        transition: { duration: 1.15 },
      },
    },
  
    // slideFade: {
    //   in: {
    //     initial: { translateX: "1rem", opacity: 0 },
    //     animate: { translateX: "0rem", opacity: 1 },
    //     transition: { duration: popSeekDuration, ease: "easeInOut" },
    //   },
    //   out: {
    //     animate: { translateX: "0rem", opacity: 1 },
    //     exit: { translateX: "-1rem", opacity: 0 },
    //     transition: { duration: popSeekDuration, ease: "easeInOut" },
    //   },
    // },
  
    slideFade :{
      hidden: {
        translateX: "1rem",
        opacity: 0,
      },
      visible: {
        translateX: "0rem",
        opacity: 1,
        transition: { duration: popSeekDuration, ease: "easeInOut" },
      },
      exit: {
        translateX: "-1rem",
        opacity: 0,
        transition: { duration: popSeekDuration, ease: "easeInOut" },
      },
    },
            
        

    wipe: {
      in: {
        initial: { clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)" },
        animate: { clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)" },
        transition: { duration: 0.15 },
      },
      out: {
        animate: { clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)" },
        exit: { clipPath: "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)" },
        transition: { duration: 0.15 },
      },
    },
  
    hideBtns: {
      in: {
        initial: { opacity: 0.5, cursor: "default" },
        animate: { opacity: 1, cursor: "pointer" },
        transition: { duration: 0.15 },
      },
      out: {
        animate: { opacity: 0.5, cursor: "default" },
        exit: { opacity: 0.5, cursor: "default" },
        transition: { duration: 0.15 },
      },
    },
  };

  

  export default popAnims;

  export { popSeekDuration, popLayoutTransition };