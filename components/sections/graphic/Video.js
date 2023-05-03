import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import graphicVideoInit from "./VideoUtilities";
import Mask from "@/components/utilities/Mask";
import { play } from "@/data/ICONS";
import Image from "next/image";
import { Graphic } from "../Sections";

function Video(props) {
  const [mounted, setMounted] = useState(false);
  const { desktop, loading } = useResponsive();

  const { className, reference } = props;
  const updatedProps = getUpdatedVideoProps(props, desktop);
  const { COMMON_VIDEO_PROPS, SOURCE_PROPS, FOREGROUND_PROPS } = getOrganizedVideoProps(updatedProps, desktop);

  useEffect(() => {
    if (!reference) return;
    if (loading) return;
    setMounted(true);
  }, [reference, loading]);

  useEffect(() => {
    if (!mounted) return;
    graphicVideoInit(reference);
  }, [mounted, desktop]);

  const VidSource = (additionalClassName, additionalProps) => (
    <video className={`${className} ${additionalClassName}`} {...COMMON_VIDEO_PROPS} {...additionalProps}>
      <source {...SOURCE_PROPS}></source>
    </video>
  );

  return (
    <>
        {VidSource("video--foreground", FOREGROUND_PROPS)}
        {/* {(isHoverAutoPlay || !desktop) && VidSource("video--background")} */}
        {VidSource("video--background")}
    </>
  );
}

function getVideoAttrs(props) {
  const { ["data-autoplay"]: dataAutoplay } = props;
  const isHoverAutoPlay = typeof dataAutoplay === "string" && dataAutoplay.includes("hover");
  return { isHoverAutoPlay };
}

function getUpdatedVideoProps(props, desktop) {
  var updatedProps = props;
  if (desktop) return updatedProps;

  var { ["data-autoplay"]: dataAutoplay, ["data-loop"]: dataLoop } = props;
  dataAutoplay = (() => {
    if (dataAutoplay.includes("staggered")) return "scroll staggered";
    else return "scroll";
  })();
  dataLoop = true;
  return {
    ...props,
    "data-autoplay": dataAutoplay,
    "data-loop": dataLoop,
  };
}

function getOrganizedVideoProps(props, desktop) {
  const {
    alt,
    width,
    height,
    onClick,
    onCanPlayThrough,
    ["data-loop"]: dataLoop,
    ["data-autoplay"]: dataAutoplay,
    muted,
    autoPlay,
    controls,
    src,
    type,
  } = props;

  const FOREGROUND_PROPS = {
    onClick,
    onCanPlayThrough,
    "data-loop": dataLoop,
    "data-autoplay": dataAutoplay,
    muted,
    autoPlay,
    controls,
  };

  const COMMON_VIDEO_PROPS = {
    alt,
    width,
    height,
    disableRemotePlayback: true,
  };

  const SOURCE_PROPS = {
    src: `.${src}`,
    type: `video/${type}`,
  };

  return { COMMON_VIDEO_PROPS, SOURCE_PROPS, FOREGROUND_PROPS };
}

export default Video;
