import React from "react";
import "./empty-cart.style.css";
import ProductionQuantityLimits from "@mui/icons-material/ProductionQuantityLimits"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
    
    const navigate = useNavigate();
    
    return(
        <div>
            <div className="empty-cart-div">
                <h1>העגלה ריקה</h1>
                <Button variant="success" size="lg" onClick={() => navigate("/shop")}> לחנות </Button>
            </div>
            <ProductionQuantityLimits fontSize="large" className="no-items-cart"/>
        </div>
    )
};

export default EmptyCart;