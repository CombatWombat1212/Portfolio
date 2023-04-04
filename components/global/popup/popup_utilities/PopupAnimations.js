const popSeekDuration = 0.175;


const popAnims = {
    popupBounce: {
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
    popupFade: {
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
  
    changeImg: {
      in: {
        initial: { translateX: "1rem", opacity: 0 },
        animate: { translateX: "0rem", opacity: 1 },
        transition: { duration: popSeekDuration, ease: "easeInOut" },
      },
      out: {
        animate: { translateX: "0rem", opacity: 1 },
        exit: { translateX: "-1rem", opacity: 0 },
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

  export { popSeekDuration };