import { Route, Router, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Shop from "../pages/shop/Shop";
import UserDetails from "../pages/userDetails/userDetails";
import ProductPage from "../pages/productPage/ProductPage"
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";

export default function AppRoutes(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="shop" element={<Shop/>}/>
                    <Route path="profile" element={<UserDetails/>}/>
                    <Route path="product/:id" element={<ProductPage/>}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="checkout" element={<Checkout/>}/>
                </Route>
            </Routes>
        </>
    )
}