import { useResponsive } from "@/scripts/contexts/ResponsiveContext";
import { useEffect, useState } from "react";
import graphicVideoInit from "./VideoUtilities";
import useBrowser from "@/scripts/hooks/useBrowser";
import Image from "next/image";

function Video(props) {
  const [mounted, setMounted] = useState(false);
  const { desktop, loading } = useResponsive();
  const browser = useBrowser();

  const { className, reference, playbackRate } = props;
  const updatedProps = getUpdatedVideoProps(props, desktop);
  const { COMMON_VIDEO_PROPS, SOURCE_PROPS, FOREGROUND_PROPS } = getOrganizedVideoProps(updatedProps, desktop, browser);

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

  const { ["data-fallback"]: fallback } = props;
  const hasFallback = fallback && fallback !== false;
  const htmlLoop = props["data-loop"] == true && props["data-autoplay"] == true;

  const renderFallback = (classes) => <Image className={classes} src={fallback} width={props.width} height={props.height} alt={props.alt} />;

  const VidSource = (additionalClassName, additionalProps) => {
    const isForeground = additionalClassName.includes("foreground");
    const classes = `${className} ${additionalClassName}`;
    const p = {
      ...COMMON_VIDEO_PROPS,
      ...additionalProps,
      ...SOURCE_PROPS,
      ...htmlLoop ? {loop: true} : {}
    }
    return (
      <>
        {isForeground ? (
          <video className={classes} {...p}>
            {/* <source {...SOURCE_PROPS}></source> */}
            {hasFallback && renderFallback(classes)}
          </video>
        ) : (
          <>{hasFallback && renderFallback(classes)}</>
        )}
      </>
    );
  };

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

function getOrganizedVideoProps(props, desktop, browser) {
  const { isSafari, browserFound } = browser;

  const isntSafari = !browserFound || !isSafari || (browserFound && !isSafari);
  const transparent = props["data-transparent"];
  const switchToMp4 = transparent && !isntSafari;
  const realSrc = switchToMp4 ? props.src.replace("webm", "mp4") : props.src;
  const realType = switchToMp4 ? props.type.replace("webm", "mp4") : props.type;

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
    "webkit-playsinline": "true",
    playsInline: true,
  };

  const SOURCE_PROPS = {
    src: `..${realSrc}`,
    type: `video/${realType}`,
  };

  return { COMMON_VIDEO_PROPS, SOURCE_PROPS, FOREGROUND_PROPS };
}

Video.displayName = "Video";

export default Video;
