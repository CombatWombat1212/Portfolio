
import Navigation from "./Navigation";
import Footer from "./Footer";


function Layout ({children}) {


    return (
        <>
            <Navigation />
            <main className="main">{children}</main>
        </>
    );

}


export default Layout;