import React, { useEffect, useState, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import sign from "jwt-encode";
import CartItem from "../../componentes/cart-item/cart-item.component";
import { AppContext } from "../../app";

import { getCartItems, getTotalPrice, setCartItems, mergeCarts } from "../../functions/cart-functions";
import { useAlert } from 'react-alert';
import "./cart-page.style.css";
import { useNavigate } from "react-router-dom";
import TotalPriceTag from "../../componentes/total-price/total-price.component";
import LoadingPage from "../loading/loading.page";
import EmptyCart from "../../componentes/empty-cart/empty-cart.component";
import ShoppingCartCheckoutOutlined from "@mui/icons-material/ShoppingCartCheckoutOutlined"

const tokenCode = "cartItems";

const CartPage = () => {

    const cAlert = useAlert();

    const [cart, setCart] = useState(false);

    const { userState } = useContext(AppContext);

    const [gotCartData, setGotCartData] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {

            let cartData = await getCartItems(userState);
            let localStorge = await getCartItems(false);
            // if there is no cart items in the server and there are cart items in local storge will update the one at the server 
            // and will del the local ones to prevent double the amount next time the user will log in
            if (userState && !cartData.length && localStorge.length) {
                cartData = localStorge;
                setCartItems(userState, sign(localStorge, tokenCode))
                setCartItems(false, sign([], tokenCode))
                //if theres two carts one in local and one on the server will merge them and will del the local one
            } else if (userState && cartData.length && localStorge.length) {
                cartData = await mergeCarts(cartData, localStorge);
                setCartItems(userState, sign(cartData, tokenCode))
                setCartItems(false, sign([], tokenCode))
            };
            setGotCartData(true);
            setCart(cartData);


        })();

    }, [userState]);

    const handleDelete = (itemName) => {

        setCart(prevValue => prevValue.filter(i => i.name != itemName));

        const data = sign(cart.filter(i => i.name != itemName), tokenCode);

        setCartItems(userState, data);


    };

    const handleAmountChange = (itemName, newAmount, oldAmount) => {

        if (newAmount === oldAmount) {
            return;
        } else {
            // change the amount on the item that changed
            const newCart = cart.map(item => {
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
            // set the cart state to the new one
            setCart(newCart);

            // send the new cart to the storge
            const data = sign(newCart, tokenCode);

            setCartItems(userState, data);
        };
    };

    const handleCheckOutPress = () => {
        if (!userState) {
            cAlert.info("כדי לבצע הזמנה אתה צריך להתחבר");
            navigate("/login");
        } else {
            navigate("/check-out");
        };
    };

    return (
        <div className="web-page">
            {gotCartData

                ?



                cart.length

                    ?

                    <Container className="cart-page">
                        {cart && cart.map((item, index) => (<CartItem
                            key={index}
                            item={item}
                            handleDelete={handleDelete}
                            handleAmountChange={handleAmountChange} />))}
                        <TotalPriceTag cost={getTotalPrice(cart)} />
                        <Button onClick={handleCheckOutPress}>לרכישה<ShoppingCartCheckoutOutlined /></Button>
                    </Container>


                    :
                    <EmptyCart />




                :

                <LoadingPage />
            }
        </div>
    );
    // לעשות את הסכום הסופי בתור רכיב שצמוד ללמטה של המסך ורואים תמיד
};

export default CartPage;