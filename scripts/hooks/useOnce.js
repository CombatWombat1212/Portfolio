import { useEffect, useRef } from 'react';

let didRun = false;

function useOnce(callback) {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current || didRun) return;
        didMount.current = true;
        didRun = true;
        callback();
    }, [callback]);
}

export default useOnce;
