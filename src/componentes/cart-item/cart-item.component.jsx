import React, { useState, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";

import ItemCounter from "../item-counter/item-counter.component";
import { AppContext } from "../../app";
import "./cart-item.style.css";
import RemoveShoppingCartOutlined from "@mui/icons-material/RemoveShoppingCartOutlined"


const CartItem = (props) => {


    const { allProducts } = useContext(AppContext);

    const [bordLine, setBordLine] = useState(false);

    const [itemAmount, setItemAmount] = useState(props.item.amount);

    if (allProducts) {
        var itemDescription = allProducts.filter(item => item.id == props.item.id)[0].description;
    };

    const handleDelClick = () => {
        props.handleDelete(props.item.name)
    }

    const handleMouseLeave = () => {
        props.handleAmountChange(props.item.name, itemAmount, props.item.amount)
    };


    return (
        <Row>
            <Col>
                <div className={bordLine ? "cart-item show-border" : "cart-item"}>

                    <div className="cart-image-container">
                        <img src={`/photos/products/product-${props.item.id}/image0.png`} />
                    </div>

                    <div className="cart-item-text"
                        onMouseLeave={handleMouseLeave}
                    >
                        <h3>{props.item.name}</h3>
                        <p>{itemDescription}</p>
                        <ItemCounter
                            count={itemAmount}
                            countFunc={setItemAmount}
                        />
                        <h5>מחיר יחידה: {props.item.price} ש"ח</h5>
                        <h4>סה"כ לפריט זה: {props.item.price * props.item.amount} ש"ח </h4>
                    </div>
                    
                    <Button
                        variant="danger"
                        size="sm"
                        className="del-btn"
                        onMouseEnter={() => setBordLine(true)}
                        onMouseLeave={() => setBordLine(false)}
                        onClick={handleDelClick}
                    ><RemoveShoppingCartOutlined /></Button>

                </div>
            </Col>
        </Row>
    )


};

export default CartItem;