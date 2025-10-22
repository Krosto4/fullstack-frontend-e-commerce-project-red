import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";

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