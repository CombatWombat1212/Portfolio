import { useState, useEffect } from 'react';

const useScrollTop = (ref) => {
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        if (!ref.current) return;
        const onScroll = () => {
            setScrollTop(ref.current.scrollTop);
        };
        
        const currentElement = ref.current;
        currentElement.addEventListener('scroll', onScroll);

        return () => {
            currentElement.removeEventListener('scroll', onScroll);
        };
    }, [ref]);

    return scrollTop;
};

export default useScrollTop;
