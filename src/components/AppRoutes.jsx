import { Route, Router, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";

export default function AppRoutes(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="login" element={<Login/>}/>
                </Route>
            </Routes>
        </>
    )
}