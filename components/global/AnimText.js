import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const variants = {
  initial: { opacity: 0, y: -25 },
  animate: { opacity: 1, y: 0},
  exit: { opacity: 0, y: 25},
};

function AnimatedText({ main, alternate, className = "" }) {
  const [on, setOn] = useState(false);
  const mainRef = useRef(null);
  const altRef = useRef(null);

  const text = {
    className: className,
    on: on,
    setOn: setOn,
    main: {
      ref: mainRef,
    },
    alt: {
      ref: altRef,
    },
  };

  const onClickHandler = () => {
    setOn(!on);
  };

  const output = on ? main : alternate;
  const outputType = on ? "main" : "alt";

  return (
    <div
      className="anim-text--wrapper"
      onClick={onClickHandler}
      >
      <AnimatePresence mode="wait">
        <motion.div
          className={`anim-text anim-text__main`}
          key={output}
          variants={variants}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          initial="initial"
          animate="animate"
          exit="exit">
          <Span text={text} type={outputType}>
            {output}
          </Span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const Span = ({ text, children, type }) => {
  const { width, setWidth, ref } = text[type];
  const { className } = text;

  //   const updateWidth = () => {
  //     if (!ref.current) return;
  //     if (width === ref.current.offsetWidth) return;
  //     setWidth(ref.current.offsetWidth);
  //   };

  //   useEffect(() => {
  //     updateWidth();
  //   }, []);

  //   useHorizontalResize(updateWidth);

  return (
    <span ref={ref} className={`anim-text--span ${className}`}>
      {children}
    </span>
  );
};

export default AnimatedText;
