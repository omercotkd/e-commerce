import React, { useEffect, useState, useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartIconOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { AppContext } from "../../app";

import "./header.style.css";

const Header = () => {

    const { userState } = useContext(AppContext);

    const navItemsNoUser = {
        shopNav: {
            name: "shopNav",
            text: "כל המוצרים",
            linkNav: "/shop"
        },
        loginNav: {
            name: "loginNav",
            text: "כניסה",
            linkNav: "/login"
        },
        registerNav: {
            name: "registerNav",
            text: "הרשמה",
            linkNav: "/register"
        },
        cartNav: {
            name: "cartNav",
            text: "עגלה",
            linkNav: "/cart"
        }
    }

    const navItemsUser = {
        shopNav: {
            name: "shopNav",
            text: "כל המוצרים",
            linkNav: "/shop"
        },
        logoutNav: {
            name: "logoutNav",
            text: "יציאה",
            linkNav: "/logout"
        },
        myAccountNav: {
            name: "myAccountNav",
            text: "המשתמש שלי",
            linkNav: "/myAccount"
        },
        cartNav: {
            name: "cartNav",
            text: `עגלה `,
            linkNav: "/cart"
        }
    }

    const location = useLocation();

    // change this state to a useContext one
    const [textBold, setTextBold] = useState({
        shopNav: false,
        loginNav: false,
        registerNav: false,
        cartNav: false,
        myAccountNav: false,
        logoutNav: false
    })

    useEffect(() => {
        setTextBold(() => (
            {
                shopNav: false,
                loginNav: false,
                registerNav: false,
                cartNav: false,
                [`${location.pathname.split("/")[1]}Nav`]: true
            }
        ))
    }, [location]);


    return (
        <header>
            <Navbar collapseOnSelect expand="md" className="navber-parent">
                <Navbar.Brand><Link to="/" className="links"><img src="/photos/dragon-logo.png" alt="logo" /></Link></Navbar.Brand>
                <Navbar.Brand><Link to="/" className="links">A.L Double Impact</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="float-to-the-right">

                    {
                        userState

                            ?

                            Object.keys(navItemsUser).map((item, index) => (
                                <Nav
                                    className={textBold[item] ? "nav-drop-item text-bold" : "nav-drop-item"}
                                    key={index}
                                >
                                    <Link
                                        to={navItemsUser[item].linkNav}
                                        className="links"
                                        name={navItemsUser[item].name}
                                    >{navItemsUser[item].text}{item == "cartNav" && <ShoppingCartIconOutlined fontSize="large" />}</Link>

                                </Nav>
                            ))

                            :

                            Object.keys(navItemsNoUser).map((item, index) => (
                                <Nav
                                    className={textBold[item] ? "nav-drop-item text-bold" : "nav-drop-item"}
                                    key={index}
                                >
                                    <Link
                                        to={navItemsNoUser[item].linkNav}
                                        className="links"
                                        name={navItemsNoUser[item].name}
                                    >{navItemsNoUser[item].text}{item == "cartNav" && <ShoppingCartIconOutlined fontSize="large" />}</Link>

                                </Nav>
                            ))
                    }

                </Navbar.Collapse>
            </Navbar>
        </header>
    );

};
// <ShoppingCartIcon/>
export default Header;