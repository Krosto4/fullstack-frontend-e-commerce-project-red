import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout(){
    return(
        <>
            <div className="app">
                <header>
                    <Header/>
                </header>
                <main style={{minHeight: "70vh"}}>
                    <Outlet/>
                </main>
                <footer>
                    <Footer/>
                </footer>
            </div>
        </>
    )
}