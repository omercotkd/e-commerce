import React from "react";

import { Button } from "react-bootstrap";

import "./product-size-button.style.css";

const ProductSizeButton = (props) => {
    return(
        // giving the btn a className of bold if this is the last btn that as been presed
        
        <Button onClick={() => props.click(props.index, props.text)}
                variant={props.isBold && props.isBold[props.index] ? "secondary" : "outline-secondary"}
        >
        {props.text}
        </Button>
        
    );
};

export default ProductSizeButton;