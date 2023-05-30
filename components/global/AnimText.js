import useHorizontalResize from "@/scripts/hooks/useHorizontalResize";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// TODO: going to have to rethink the animation a bit, and have the pieces come down one at a time rather than all at once.  you know what i mean

const variants = {
  initial: { opacity: 0, y: -25 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 25 },
};

const ANIM_DURATION = 0.5;

function AnimatedText({ main, alternate, className = "", innerClassName = "" }) {
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

  const altPieces = alternate.split("-");

  const motionProps = {
    variants: variants,
    initial: "initial",
    animate: "animate",
    exit: "exit",
    transition: { duration: 0.5, ease: "easeInOut" },
    className: `anim-text anim-text__${outputType}`,
    key: output,
  };

  return (
    <div className="anim-text--wrapper" onClick={onClickHandler}>
      <AnimatePresence mode="wait">
        {on ? (
          <motion.span {...motionProps}>
            <Span text={text} type={outputType}>
              {output}
            </Span>
          </motion.span>
        ) : (
          <motion.div {...motionProps}>
            {altPieces.map((piece, index) => {
              const delay = index * 0.2;
              if (index != 0) piece = "-" + piece;
              return (
                <motion.span
                  key={index}
                  variants={variants}
                  transition={{ delay: delay, duration: 0.5, ease: "easeInOut" }}
                  initial="initial"
                  animate="animate"
                  style={{ display: "inline-block" }}
                  className={innerClassName}>
                  {piece}
                </motion.span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
const Span = ({ text, children, type }) => {
  const { width, setWidth, ref } = text[type];
  const { className } = text;

  return (
    <span ref={ref} className={`anim-text--span ${className}`}>
      {children}
    </span>
  );
};

AnimatedText.displayName = "AnimatedText";
Span.displayName = "Span";

export default AnimatedText;
