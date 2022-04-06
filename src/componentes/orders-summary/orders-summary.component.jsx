import React from "react";
import { Button, Col, Row } from "react-bootstrap";

import "./orders-summary.style.css";

import { getTotalPrice } from "../../functions/cart-functions";

import jwtDecode from "jwt-decode";

import { useNavigate } from "react-router-dom";

const OrdersSummary = (props) => {


    const navigate = useNavigate();

    const handleClick = (order) => {
        navigate("view-order", { state: { order: order } })
    };


    return (
        <div>

            {
                // לשנות את הכיתוב של הכפתור לערוך הזמנה אם עדין אפשר
                props.orders.map((item, index) =>
                    <div key={index} className={props.delivered ? "mark-green table-row-view-orders " : "mark-red table-row-view-orders"} >
                        <div>
                            <Button onClick={() => handleClick(item)}>צפה בהזמנה</Button>
                        </div>
                        <div>
                            <h6>:עלות</h6>
                            <p>&#8362;{getTotalPrice(jwtDecode(item.the_order))}</p>
                        </div>

                        <div>
                            <h6>:שעת ביצוע ההזמנה</h6>
                            <p>{item.date.split(" ")[1].split(".")[0]}</p>
                        </div>
                        <div>
                            <h6>:תאריך</h6>
                            <p>{item.date.split(" ")[0]}</p>
                        </div>
                        <div>
                            <h6>:מספר הזמנה</h6>
                            <p>{item.id}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )

};

export default OrdersSummary;