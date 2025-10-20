import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Layout(){
    return(
        <>
            <div className="app">
                <header>
                    <p>header</p>
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