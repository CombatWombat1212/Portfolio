import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function AnimPres({ children, animation, condition, className, mode, delay, style, elemkey, onAnimationComplete, duration, reference, trigger }) {
    const [shouldAnimate, setShouldAnimate] = useState(trigger === undefined);
  
    useEffect(() => {
      if (trigger !== undefined && trigger) {
        setShouldAnimate(true);
      }
    }, [trigger]);
  
    return (
      <AnimatePresence mode={mode ? mode : "sync"}>
        {condition && (
          <>
            <motion.div
              key={elemkey ? elemkey : "anim"}
              initial={shouldAnimate ? animation.in.initial : animation.in.initial}
              animate={shouldAnimate ? animation.in.animate : animation.in.initial}
              exit={animation.out.exit}
              transition={{
                ...animation.in.transition,
                duration: duration !== undefined ? duration : animation.in.transition.duration !== undefined ? animation.in.transition.duration : 0,
                delay: animation.in.transition.delay !== undefined ? animation.in.transition.delay : delay ? delay : 0,
              }}
              className={className ? className : ""}
              style={style ? style : {}}
              ref={reference}
              onAnimationComplete={onAnimationComplete ? onAnimationComplete : () => {}}>
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  
    export default AnimPres;