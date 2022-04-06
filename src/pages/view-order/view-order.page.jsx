import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useAlert } from 'react-alert';
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../loading/loading.page";
import TotalPriceTag from "../../componentes/total-price/total-price.component";
import { Button, Container, Row, Col } from "react-bootstrap";
import CartItem from "../../componentes/cart-item/cart-item.component";
import { getTotalPrice } from "../../functions/cart-functions";
import sign from "jwt-encode";


const tokenCode = "cartItems";
const options = {
    timeZone: 'Israel',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};

const ViewOrder = () => {

    const cAlert = useAlert();

    const { state } = useLocation();

    const navigate = useNavigate();

    const [order, setOrder] = useState();

    const [orderComments, setOrderComments] = useState();

    const [canEdit, setCanEdit] = useState(false);

    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        if (!state) {
            navigate("/myAccount/orders");
        } else {
            setOrder(jwtDecode(state.order.the_order));

            setOrderComments(state.order.comments);
            // calculate the hours passed since the order was submitted, based on Israel local time, the one that the server uses.
            const hoursPassed = (Date.parse(new Date()).toLocaleString([], options).replaceAll(",", "") - Date.parse(state.order.date)) / 3600000;
            if (hoursPassed > 6) {
                setCanEdit(false);
            } else {
                setCanEdit(true);
            };

        };
    }, []);


    const activeEditOrderMode = () => {
        setEditMode(true);
    };

    const handleSaveChanges = async () => {
        const orderId = state.order.id;

        const data = new FormData();
        data.append("order", sign(order, tokenCode));
        data.append("id", orderId);
        data.append("comments", orderComments);
        const response = await fetch("/api/change-order", { method: "POST", body: data });
        if (response.ok) {
            cAlert.success("הזמנה עודכנה");
        } else {
            cAlert.error("קראה בעיה נסה שנית");
        };
        setEditMode(false);

    };

    const handleAmountChange = (itemName, newAmount, oldAmount) => {

        if (newAmount === oldAmount) {
            return;
        } else {
            // change the amount on the item that changed
            const newOrder = order.map(item => {
                if (item.name === itemName) {
                    return (
                        {
                            ...item,
                            amount: newAmount
                        }
                    );
                } else {
                    return item;
                };
            });

            setOrder(newOrder);

        };
    };

    const handleDelete = (itemName) => {
        setOrder(prevValue => prevValue.filter(i => i.name != itemName));
       
    };

    const handleCommentChange = (event) => {
        const { name, value } = event.target;
        setOrderComments(value);
    };

    return (
        <div className="web-page">
            {!editMode
                ?
                // if not on edit mode thats what will be displayed
                order ?
                    <Container>
                        <Row>
                            <Col>
                                סה"כ
                            </Col>

                            <Col>
                                מחיר
                            </Col>
                            <Col>
                                כמות
                            </Col>
                            <Col>
                                שם פריט
                            </Col>

                        </Row>
                        {
                            order.map((item, index) => (
                                <Row key={index}>
                                    <Col>
                                        {item.amount * item.price}
                                    </Col>
                                    <Col>
                                        {item.price}
                                    </Col>
                                    <Col>
                                        {item.amount}
                                    </Col>
                                    <Col>
                                        {item.name}
                                    </Col>
                                </Row>
                            ))
                        }
                        <TotalPriceTag cost={getTotalPrice(order)} />
                        {!canEdit && <p>ניתן לערוך הזמנה רק 6 שעות אחרי שהיא בוצעה</p>}
                        <Button disabled={!canEdit} onClick={activeEditOrderMode}>ערוך הזמנה</Button>
                    </Container>
                    :
                    <LoadingPage />
                // if on edit mode thats what will be displayed
                :
                <Container >
                    {order && order.map((item, index) => (<CartItem
                        key={index}
                        item={item}
                        handleDelete={handleDelete}
                        handleAmountChange={handleAmountChange} />))}
                    <textarea value={orderComments} onChange={handleCommentChange} className="comments-area"/>
                    <TotalPriceTag cost={getTotalPrice(order)} />
                    <Button onClick={handleSaveChanges}>שמירת שינוים</Button>
                </Container>
            }
        </div>
    );
};

export default ViewOrder;