import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminMainPage = () => {

    const navigate = useNavigate();

    return(
        <div className="web-page">
            <Button onClick={() => navigate("add-items")}>add-items</Button>
            <Button onClick={() => navigate("manage-users")}>manage-users</Button>
            <Button onClick={() => navigate("all-orders")}>all-orders</Button>
            make buttons to redirect to evrey page
        </div>
    )

};

export default AdminMainPage;