import { useState, useEffect } from 'react';

const useScrollbarWidth = () => {
    const [scrollbarWidth, setScrollbarWidth] = useState(0);

    useEffect(() => {
        const computeScrollbarWidth = () => {
            const windowWidth = window.innerWidth;
            const viewportWidth = document.documentElement.clientWidth;

            const newScrollbarWidth = windowWidth - viewportWidth;

            setScrollbarWidth(prevWidth => {
                if (prevWidth !== newScrollbarWidth) {
                    return newScrollbarWidth;
                }
                return prevWidth;
            });
        }

        window.addEventListener('resize', computeScrollbarWidth);

        // Compute the initial scrollbar width
        computeScrollbarWidth();

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', computeScrollbarWidth);
        }
    }, []);

    return scrollbarWidth;
}

export default useScrollbarWidth;
