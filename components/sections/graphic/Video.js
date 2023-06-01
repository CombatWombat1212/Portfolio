import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { useEffect, useState } from "react";
import graphicVideoInit from "./VideoUtilities";

function Video(props) {
  const [mounted, setMounted] = useState(false);
  const { desktop, loading } = useResponsive();

  const { className, reference, playbackRate } = props;
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


  useEffect(() => {
    if (!mounted) return;
    if(playbackRate == 1 || !playbackRate || playbackRate == undefined) return;
    reference.current.querySelector(".video--foreground").playbackRate = playbackRate;
  }, [mounted]);


  

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


function getUpdatedVideoProps(props, desktop) {
  var updatedProps = props;
  if (desktop) return updatedProps;

  var { ["data-autoplay"]: dataAutoplay, ["data-loop"]: dataLoop } = props;
  dataAutoplay = (() => {
    if (typeof dataAutoplay == "string" && dataAutoplay.includes("staggered")) return "scroll staggered";
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
    src: `..${src}`,
    type: `video/${type}`,
  };

  return { COMMON_VIDEO_PROPS, SOURCE_PROPS, FOREGROUND_PROPS };
}

Video.displayName = "Video";

export default Video;
