import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../app";
import { getCartItems, getTotalPrice, setCartItems } from "../../functions/cart-functions";
import CheckOutProductsTable from "../../componentes/check-out-products-table/check-out-products.component";
import { Container, Button } from "react-bootstrap";
import TotalPriceTag from "../../componentes/total-price/total-price.component";
import { submitOrder } from "../../functions/submit-order";
import { useAlert } from 'react-alert';
import "./check-out-page.style.css";
import LoadingPage from "../loading/loading.page";
import ConfirmEmailMsg from "../../componentes/confirm-email-msg/confirm-email-msg.component";


const CheckOutPage = () => {

    const cAlert = useAlert();

    const { userState } = useContext(AppContext);

    const navigate = useNavigate();

    const [itemsToBuy, setItemsToBuy] = useState();

    const [orderComments, setOrderComments] = useState("");

    const [apiRespond, setApiRespond] = useState(false);

    const [userConfirmedEmail, setUserConfirmedEmail] = useState(true);

    useEffect(() => {

        (async () => {
            if (!userState) {
                // 404 page? or navigate need to make it
                navigate("/");
            } else {
                setItemsToBuy(await getCartItems(userState));
                const response = await fetch("/api/check-confirmed-email");
                if (!response.ok) {
                    setUserConfirmedEmail(false);
                };
                setApiRespond(true);
            };
        })();

    }, [])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setOrderComments(value);
    };

    const handleOrderSubmiton = async () => {

        if (!userConfirmedEmail) {
            return;
        };

        const res = await submitOrder(orderComments);

        if (res) {
            cAlert.success("הזמנה נשלחה");
            navigate("/");
        } else {
            cAlert.info("אשר את המשתמש כדי לבצע הזמנה");
        };

    };

    return (


        <div className="web-page">
            {
                apiRespond

                    ?

                    <div >
                        {!userConfirmedEmail && <ConfirmEmailMsg />}
                        {
                            itemsToBuy

                                ?

                                <Container>
                                    <CheckOutProductsTable products={itemsToBuy} />
                                    <textarea onChange={handleChange} value={orderComments} placeholder="הערות"
                                        className="comments-area" />
                                    <TotalPriceTag cost={getTotalPrice(itemsToBuy)} />
                                    <Button onClick={handleOrderSubmiton} disabled={userConfirmedEmail ? false : true}>בצע הזמנה</Button>
                                </Container>

                                :

                                navigate("/cart")
                        }
                    </div>

                    :

                    <LoadingPage />
            }
        </div>
    )
};

export default CheckOutPage;