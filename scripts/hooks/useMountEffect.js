import { useEffect } from "react";

const useMountEffect = (fun) => useEffect(fun, []);

export {useMountEffect};