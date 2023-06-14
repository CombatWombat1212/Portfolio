import useIsntFallback from "@/scripts/hooks/useIsntFallback";
import { useRef, useState } from "react";

function usePop() {
  const [popupType, setPopupType] = useState(false);
  const [popupImg, setPopupImg] = useState(false);
  const [popupZoom, setPopupZoom] = useState(false);
  const [popupOn, setPopupOn] = useState(false);
  const [popupGroup, setPopupGroup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(false);
  const [popupUiVisible, popupSetUIVisible] = useState(true);
  const [popupImgLoaded, setPopupImgLoaded] = useState(false);
  const [popupImgDrawn, setPopupImgDrawn] = useState(false);
  const [popupInfoDrawn, setPopupInfoDrawn] = useState(false);
  const [popupDrawn, setPopupDrawn] = useState(false);
  const [popupSeekCooldown, setPopupSeekCooldown] = useState(false);
  const [popupSeekDir, setPopupSeekDir] = useState("left");
  const { isntFallback, isntFirefox, isntSafari } = useIsntFallback();

  const [imgReady, setImgReady] = useState(false);
  const [firstImgReady, setFirstImgReady] = useState(false);
  const [firstImgDrawn, setFirstImgDrawn] = useState(false);

  const pop = {
    type: popupType,
    setType: setPopupType,
    img: popupImg,
    setImg: setPopupImg,
    zoom: popupZoom,
    setZoom: setPopupZoom,
    on: popupOn,
    setOn: setPopupOn,
    onRef: useRef(popupOn),
    group: popupGroup,
    setGroup: setPopupGroup,
    index: popupIndex,
    setIndex: setPopupIndex,
    imgLoaded: popupImgLoaded,
    setImgLoaded: setPopupImgLoaded,
    drawn: popupDrawn,
    setDrawn: setPopupDrawn,
    seekCooldown: popupSeekCooldown,
    setSeekCooldown: setPopupSeekCooldown,
    seekDir: popupSeekDir,
    setSeekDir: setPopupSeekDir,
    imgReady: imgReady,
    setImgReady: setImgReady,
    firstImgReady: firstImgReady,
    setFirstImgReady: setFirstImgReady,
    firstImgDrawn: firstImgDrawn,
    setFirstImgDrawn: setFirstImgDrawn,
    imgDrawn: popupImgDrawn,
    setImgDrawn: setPopupImgDrawn,
    infoDrawn: popupInfoDrawn,
    setInfoDrawn: setPopupInfoDrawn,
    isntFallback,
    isntFirefox,
    isntSafari,

    ui: {
      visible: popupUiVisible,
      setVisible: popupSetUIVisible,
    },
  };

  return pop;
}

export default usePop;
