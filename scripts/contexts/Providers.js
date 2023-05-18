import { InterceptProvider } from "./InterceptContext";
import { ResponsiveProvider } from "./ResponsiveContext";

function Providers({ children }) {
  return (
    <ResponsiveProvider>
      <InterceptProvider>{children}</InterceptProvider>
    </ResponsiveProvider>
  );
}

export default Providers;
