import Navigation from "./Navigation";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main className="main">{children}</main>
    </>
  );
}

Layout.displayName = "Layout";

export default Layout;
