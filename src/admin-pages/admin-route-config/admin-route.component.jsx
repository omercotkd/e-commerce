import React, { useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { AppContext } from "../../app";

import AddItemsPage from "../add-items/add-items.component";
import AdminMainPage from "../main-page/admin-main.page";
import ManageUsersPage from "../manage-users/manage-users.page";
import AllOrdersPage from "../all-orders/all-orders.page";
import ViewOrder from "../../pages/view-order/view-order.page";


const AdminRoute = () => {

    const navigate = useNavigate();

    const { userState } = useContext(AppContext);

    // test if the user is an admin if not will redirect to the home page
    useEffect(() => {
        
        if(userState){
            fetch("/api/admin/test-admin").
            then(res => {
                if(!res.ok){
                    navigate("/");
                };
            });
        }else{
            navigate("/");
        }
    }, [])


    return (
        <Routes >
            <Route path="/" element={<AdminMainPage />} />
            <Route path="/add-items" element={<AddItemsPage />} />
            <Route path="/manage-users" element={<ManageUsersPage />} />
            <Route path="/all-orders" element={<AllOrdersPage />} />
            <Route path="/all-orders/view-order" element={<ViewOrder />}/>
        </Routes>
    );
};

export default AdminRoute;

