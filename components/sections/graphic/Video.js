import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { useEffect, useState } from "react";
import graphicVideoInit from "./VideoUtilities";
import useBrowser from "@/scripts/hooks/useBrowser";

function Video(props) {
  const [mounted, setMounted] = useState(false);
  const { desktop, loading } = useResponsive();
  const browser = useBrowser();

  const { className, reference, playbackRate } = props;
  const updatedProps = getUpdatedVideoProps(props, desktop);
  const { COMMON_VIDEO_PROPS, SOURCE_PROPS, FOREGROUND_PROPS } = useOrganizedVideoProps(updatedProps, desktop, browser);

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
    if (playbackRate == 1 || !playbackRate || playbackRate == undefined) return;
    reference.current.querySelector(".video--foreground").playbackRate = playbackRate;
  }, [mounted]);

  // console.log(SOURCE_PROPS);

  const VidSource = (additionalClassName, additionalProps) => (
    <video className={`${className} ${additionalClassName}`} {...COMMON_VIDEO_PROPS} {...additionalProps} {...SOURCE_PROPS}>
      {/* <source {...SOURCE_PROPS}></source> */}
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
  if (typeof dataAutoplay === "string" && dataAutoplay.includes("staggered")) {
    dataAutoplay = "scroll staggered";
  } else {
    dataAutoplay = "scroll";
  }
  dataLoop = true;
  return {
    ...props,
    "data-autoplay": dataAutoplay,
    "data-loop": dataLoop,
  };
}

function useOrganizedVideoProps(props, desktop, browser) {
  const [src, setSrc] = useState(props.src);
  const [type, setType] = useState(props.type);
  const [isntSafari, setIsntSafari] = useState(true);
  const { isSafari, browserFound } = browser;

  useEffect(() => {
    const newIsntSafari = !browserFound || !isSafari || (browserFound && !isSafari);
    setIsntSafari(newIsntSafari);
  }, [browserFound, isSafari]);

  useEffect(() => {
    if (isntSafari) return;
    const transparent = props["data-transparent"];
    const switchToMp4 = transparent && !isntSafari;
    const realSrc = switchToMp4 ? props.src.replace("webm", "mp4") : props.src;
    const realType = switchToMp4 ? props.type.replace("webm", "mp4") : props.type;
    setSrc(realSrc);
    setType(realType);
  }, [isntSafari]);

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
    // src,
    // type,
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

  // if(switchToMp4){
  //   console.log({ COMMON_VIDEO_PROPS, SOURCE_PROPS, FOREGROUND_PROPS });
  //   }

  return { COMMON_VIDEO_PROPS, SOURCE_PROPS, FOREGROUND_PROPS };
}

Video.displayName = "Video";

export default Video;
