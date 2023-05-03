function createEventListenerTracker() {
    const elementListenersMap = new WeakMap();
  
    function addEventListenerWithTracking(element, event, handler) {
      element.addEventListener(event, handler);
  
      if (!elementListenersMap.has(element)) {
        elementListenersMap.set(element, []);
      }
  
      elementListenersMap.get(element).push({ event, handler });
    }
  
    function removeEventListenerWithTracking(element, event, handler) {
      if (elementListenersMap.has(element)) {
        const listeners = elementListenersMap.get(element);
        const listenerIndex = listeners.findIndex(
          (listener) => listener.event === event && listener.handler === handler
        );
  
        if (listenerIndex !== -1) {
          element.removeEventListener(event, handler);
          listeners.splice(listenerIndex, 1);
  
          if (listeners.length === 0) {
            elementListenersMap.delete(element);
          }
        }
      }
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
      removeEventListenerWithTracking,
      removeAllEventListeners,
    };
  }
  
  export default createEventListenerTracker;
  