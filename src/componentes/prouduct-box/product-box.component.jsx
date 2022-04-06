import React from "react";
import { Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./product-box.style.css";

const ProductBox = (props) => {
    const productId = props.product.id;
    const previewImage = `/photos/products/product-${productId}/image0.png`;
    const navigate = useNavigate("");

    const handleClick = () => {
        navigate(`/shop/product/${productId}`);
    };



    return (
        <Col xl={2} lg={3} md={4} sm={6} xs={12}>
            <Container className="product-box" onClick={handleClick}>
                
                <div className="product-box-image" >
                    <img src={previewImage} />
                </div>
                
                <div className="product-box-text">
                    <p>{props.product.name}</p>
                    <h5> &#8362; {props.product.price}  : {props.product.price_jump ? "מחיר התחלתי" : "מחיר"}</h5>
                </div>
            </Container>
        </Col>
    );


};

export default ProductBox;