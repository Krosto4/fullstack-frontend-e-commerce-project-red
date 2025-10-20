import { Outlet } from "react-router-dom";

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
                    <p>footer</p>
                </footer>
            </div>
        </>
    )
}