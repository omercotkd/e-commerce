import React from "react";
import { Row, Col } from "react-bootstrap";

import TableRow from "./table-row.component";
import "./check-out-products.style.css";

const CheckOutProductsTable = (props) => {



    return (
        <div>
            <Row className="check-out-header">
                <Col>מחיר</Col>
                <Col>מחיר יחידה</Col>
                <Col>כמות</Col>
                <Col>שם המוצר</Col>
            </Row>
            {
                props.products.map((item, index) => <TableRow key={index} product={item} />)
            }
        </div>
    )
};

export default CheckOutProductsTable;