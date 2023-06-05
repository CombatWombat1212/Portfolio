import { RESIZE_TIMEOUT, clamp, map, splitPx, splitS } from "@/scripts/GlobalUtilities";

function ImageRowObj(ref, inView, scrollType, direction) {
  this.ref = ref;
  this.type = scrollType;
  this.direction = direction;
  this.elem = ref.current;
  this.observer = null;
  this.distance = 0;
  this.progress = 0;
  this.scrollingInterval = null;
  this.rowOnLoadDelayed = null;
  this.images = {
    width: 0,
    height: 0,
    elems: [],
    visible: [],
    cycles: [],
  };
  this.is = {
    resizing: false,
    scroll: scrollType == "scroll",
    auto: scrollType == "auto",
    left: direction == "left",
    right: direction == "right",
    inView: inView,
  };
}

ImageRowObj.prototype.getImages = function () {
  var images = Array.from(this.elem.querySelectorAll(".image-row--image"));
  this.images.elems = images;
};

ImageRowObj.prototype.getDistance = function () {
  this.distance = window.innerHeight;
};

ImageRowObj.prototype.getImageSize = function () {
  this.images.width = splitPx(getComputedStyle(this.images.elems[0]).getPropertyValue("width"));
  const tempHeight = splitPx(getComputedStyle(this.images.elems[0]).getPropertyValue("height"));

  if (tempHeight > 0 && tempHeight < 10000) {
    this.images.height = tempHeight;
  }
};

ImageRowObj.prototype.getProgress = function () {
  const rect = this.elem.getBoundingClientRect();
  const rowMidPoint = rect.top + rect.height / 2;
  const viewportMidPoint = window.innerHeight / 2;
  const distance = viewportMidPoint - rowMidPoint;
  const maxDistance = window.innerHeight / 2 + rect.height / 2;
  var progress = Math.min(distance / maxDistance, 1);

  progress = clamp(progress, -1, 1);
  progress = map(progress, -1, 1, 0, 1);

  this.progress = progress;
};

ImageRowObj.prototype.setHeight = function () {
  this.elem.style.setProperty("--image-height", `${this.images.height}px`);
};

ImageRowObj.prototype.setProgress = function (val) {
  const progress = val || this.progress;
  this.elem.style.setProperty("--image-row-progress", `${progress}`);
};

ImageRowObj.prototype.onScroll = function () {
  this.getProgress();
  this.setProgress();
};

ImageRowObj.prototype.resetAutoScroll = function () {
  const prog = this.is.left ? 1 : 0;
  this.getImages();
  this.images.cycles = Array(this.images.elems.length).fill(0);
  this.images.elems.forEach((elem) => {
    elem.style.setProperty("--image-row-cycle", 0);
  });
  this.elem.style.setProperty("--image-row-progress", prog);
  this.progress = prog;
  this.setProgress(prog);
};

ImageRowObj.prototype.initAutoScroll = function () {
  this.addVisibilityObservers();
  this.clearInterval();
  const dur = splitS(window.getComputedStyle(this.elem).getPropertyValue("--image-row-auto-transition"));
  const rate = Number(window.getComputedStyle(this.elem).getPropertyValue("--image-row-auto-movement-rate"));

  this.scrollingInterval = setInterval(() => {
    const inView = this.elem.style.getPropertyValue("--in-view") == "true" ? true : false;
    const resizing = this.elem.style.getPropertyValue("--is-resizing") == "true" ? true : false;
    const lastElemIndex = this.images.elems.length - 1;

    if (
      ((this.is.right && this.images.visible[0] === false) || (this.is.left && this.images.visible[lastElemIndex] === false)) &&
      inView &&
      !resizing
    ) {
      const shiftElemIndex = this.is.right ? 0 : lastElemIndex;
      const elem = this.images.elems[shiftElemIndex];
      const cycleVal = this.is.right ? 1 : -1;
      this.images.cycles[shiftElemIndex] += cycleVal;
      const cycle = this.images.cycles[shiftElemIndex];

      elem.style.setProperty("--image-row-cycle", `${cycle}`);

      rotateArray(this.images.elems, this.is.right);
      rotateArray(this.images.visible, this.is.right);
      rotateArray(this.images.cycles, this.is.right);
    }

    const prog = Number(window.getComputedStyle(this.elem).getPropertyValue("--image-row-progress"));
    this.progress = prog - rate;
    this.setProgress();
  }, dur);
};

ImageRowObj.prototype.clearInterval = function () {
  if (this.scrollingInterval) {
    clearInterval(this.scrollingInterval);
    this.scrollingInterval = null;
  }
};

ImageRowObj.prototype.onLoad = function () {
  this.getImages();
  this.getImageSize();
  this.setHeight();
  this.getDistance();
  if (this.type == "scroll") {
    this.onScroll();
  } else if (this.type == "auto") {
    this.resetAutoScroll();
    this.initAutoScroll();
  }
};

ImageRowObj.prototype.setResizeListener = function () {
  this.rowOnLoadDelayed = () => {
    window.clearTimeout(this.is.resizing);
    this.elem.style.setProperty("--is-resizing", true);
    this.is.resizing = setTimeout(() => {
      this.elem.style.setProperty("--is-resizing", false);
      this.onLoad();
    }, RESIZE_TIMEOUT);
  };

  window.addEventListener("resize", this.rowOnLoadDelayed);
};

ImageRowObj.prototype.clearResizeListener = function () {
  window.removeEventListener("resize", this.rowOnLoadDelayed);
};

ImageRowObj.prototype.addScrollObserver = function () {
  if (this.observer) {
    this.observer.disconnect();
    this.observer = null;
  }

  const onScrollHandler = () => {
    this.onScroll();
  };

  this.observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScrollHandler);
        } else {
          window.removeEventListener("scroll", onScrollHandler);
        }
      });
    },
    {
      threshold: 0,
    }
  );

  this.observer.observe(this.elem);
};

ImageRowObj.prototype.addVisibilityObservers = function () {
  // Initialize visible array with all false (no images visible yet)
  this.images.visible = Array(this.images.elems.length).fill(false);

  // Create a new observer
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      // Iterate over each entry
      entries.forEach((entry) => {
        // Get the index of the entry's target in the elems array
        const index = this.images.elems.indexOf(entry.target);
        // Update the corresponding index in the visible array
        this.images.visible[index] = entry.isIntersecting;
      });
    },
    { threshold: 0 }
  );

  // Observe each image element
  this.images.elems.forEach((imageElem) => {
    visibilityObserver.observe(imageElem);
  });
};

function rotateArray(arr, isRight) {
  if (isRight) {
    arr.push(arr.shift());
  } else {
    arr.unshift(arr.pop());
  }
}

export default ImageRowObj;
