function createEventListenerTracker() {
    const elementListenersMap = new WeakMap();
  
    function addEventListenerWithTracking(element, event, handler) {
      element.addEventListener(event, handler);
  
      if (!elementListenersMap.has(element)) {
        elementListenersMap.set(element, []);
      }
  
      elementListenersMap.get(element).push({ event, handler });
    }
  
    function removeAllEventListeners(element) {
      if (elementListenersMap.has(element)) {
        const listeners = elementListenersMap.get(element);
  
        for (const { event, handler } of listeners) {
          element.removeEventListener(event, handler);
        }
  
        elementListenersMap.delete(element);
      }
    }
  
    return {
      addEventListenerWithTracking,
      removeAllEventListeners,
    };
  }
  
  export default createEventListenerTracker;
  