import React from "react";
import { Row, Col } from "react-bootstrap";

const TableRow = (props) => {

    return(
        <Row>
            <Col>{props.product.price * props.product.amount}</Col>
            <Col>{props.product.price}</Col>
            <Col>{props.product.amount}</Col>
            <Col>{props.product.name}</Col>
        </Row>
    ) 

};

export default TableRow;