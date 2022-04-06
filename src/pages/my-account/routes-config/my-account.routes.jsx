import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { AppContext } from "../../../app";

import MyAccountPage from "../my-account.page";
import ChangePasswordPage from "../../change-password/change-password.page";
import MyOrdersPage from "../my-orders.page";
import ViewOrder from "../../view-order/view-order.page";

const MyAccountRotes = () => {

    const { userState } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {

        if(!userState){
            
            navigate("/login")
        }

    }, [])


    return(
        <Routes>
            <Route path="/" element={<MyAccountPage />}/> 
            <Route path="orders" element={<MyOrdersPage />}/> 
            <Route path="orders/view-order" element={<ViewOrder />}/> 
            <Route path="change-password" element={<ChangePasswordPage />}/>
        </Routes>
    )

};

export default MyAccountRotes;