import { AnimatePresence, motion } from "framer-motion";

function AnimPres({
  children,
  animation,
  condition = true,
  secondaryCondition = true,
  className,
  mode,
  delay,
  style,
  elemkey,
  onAnimationComplete,
  duration,
  reference,
  layout,
  tag,
  initial: initialProp,
  fragment = false,
  transition: transitionProp = {},
}) {
  const hasInOutAnimation = Boolean(animation.in && animation.out);
  const hasHiddenVisibleAnimation = Boolean(animation.hidden && animation.visible);

  const initial = initialProp !== undefined ? initialProp : hasInOutAnimation ? animation.in.initial : "hidden";
  const animate = hasInOutAnimation ? animation.in.animate : "visible";
  const exit = hasInOutAnimation ? animation.out.exit : "exit";

  const defaultTransition = {
    duration: 0,
    delay: 0,
  };

  const applyTransitionOverrides = (animType) => {
    if (!animType || !animType.transition) return animType;

    return {
      ...animType,
      transition: {
        ...animType.transition,
        ...(transitionProp ? transitionProp : {}),
        duration:
          duration !== undefined ? duration : animType.transition.duration !== undefined ? animType.transition.duration : defaultTransition.duration,
        delay: delay !== undefined ? delay : animType.transition.delay !== undefined ? animType.transition.delay : defaultTransition.delay,
      },
    };
  };

  const variants = hasHiddenVisibleAnimation
    ? {
        hidden: applyTransitionOverrides(animation.hidden),
        visible: applyTransitionOverrides(animation.visible),
        exit: applyTransitionOverrides(animation.exit),
      }
    : undefined;

  const transition = hasInOutAnimation
    ? {
        ...animation.in.transition,
        ...(transitionProp ? transitionProp : {}),
      }
    : defaultTransition;

  // Set duration and delay after spreading animation.in.transition and transitionProp
  transition.duration = duration !== undefined ? duration : transition.duration !== undefined ? transition.duration : defaultTransition.duration;
  transition.delay = delay !== undefined ? delay : transition.delay !== undefined ? transition.delay : defaultTransition.delay;


  return <AnimatePresence mode={mode ? mode : "sync"}>{condition && (fragment ? <>{renderMotionDiv()}</> : renderMotionDiv())}</AnimatePresence>;

  function renderMotionDiv() {
    const MotionElement = tag ? motion[tag] : motion.div;

    return (
      <MotionElement
        key={elemkey ? elemkey : "anim"}
        initial={initial}
        animate={animate}
        exit={exit}
        variants={variants}
        transition={transition}
        className={className ? className : ""}
        style={style ? style : {}}
        ref={reference}
        onAnimationComplete={onAnimationComplete ? onAnimationComplete : () => {}}
        {...(layout !== undefined ? { layout: layout } : {})}>
        {secondaryCondition && children}
      </MotionElement>
    );
  }
}
AnimPres.displayName = "AnimPres";
export default AnimPres;
