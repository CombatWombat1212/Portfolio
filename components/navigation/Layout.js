
import Navigation from "./Navigation";
import Footer from "./Footer";


function Layout ({children}) {


    return (
        <>
            <Navigation></Navigation>
            <main className="main">{children}</main>
            <Footer></Footer>
        </>
    );

}


export default Layout;