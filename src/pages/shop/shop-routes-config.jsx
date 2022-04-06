import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductPage from "../product/product.page";
import ShopPage from "./shop.page";

const ShopRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<ShopPage/>}/>
            <Route path=":group" element={<ShopPage/>} />
            <Route path="product/:id" element={<ProductPage/>} />
        </Routes>
    );
};

export default ShopRoutes;