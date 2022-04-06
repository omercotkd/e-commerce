import React, { useLayoutEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./componentes/header/header.component"
import HomePage from "./pages/home/home.page";
import AdminRoute from "./admin-pages/admin-route-config/admin-route.component";
import CartPage from "./pages/cart/cart.page";
import LoginPage from "./pages/login/login.page";
import RegisterPage from "./pages/register/register.page";
import Footer from "./componentes/footer/footer.component";

import getProducts from "./functions/get-products";
import ShopRoutes from "./pages/shop/shop-routes-config";
import LogOutPage from "./pages/logout/logout.page";
import CheckOutPage from "./pages/check-out/check-out.page";
import MyAccountRotes from "./pages/my-account/routes-config/my-account.routes";

import { checkUserState } from "./functions/userStateFunctions";
import Page404 from "./pages/404Page/404.page";
import LoadingPage from "./pages/loading/loading.page";
import ForgotPasswordPage from "./pages/forgot-password/forgot-password.page";

export const AppContext = createContext();

const App = () => {

    const [userState, setUserState] = useState(false);

    const [allProducts, setAllProducts] = useState(false);

    const [apiRespond, setApiRespond] = useState(false);

    const [page404, setPage404] = useState(false);

    const [userStateChanged, setUserStateChanged] = useState(false);

    useLayoutEffect(() => {
        (async () => {

            // checks if the user is loged in
            setUserState(await checkUserState());

            setAllProducts(await getProducts());

            setApiRespond(true);
        })();

    }, []);

    // after the user state as been changed (login / logout) this hook will ask again for the product to remvoe any speciel prices
    // that this user may had
    useLayoutEffect(() => {
        (async () => {

        if(userStateChanged){
            setApiRespond(false);

            setAllProducts(await getProducts());
            
            setApiRespond(true);
        };

        })();
    }, [userStateChanged])

    return (

        apiRespond

            ?
            <Router>
                <AppContext.Provider value={{ allProducts, userState, setUserState, setPage404, setUserStateChanged }}>
                    {
                        !page404 && <Header />
                    }
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="shop/*" element={<ShopRoutes />} />
                        <Route path="admin/*" element={<AdminRoute />} />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="check-out" element={<CheckOutPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="myAccount/*" element={<MyAccountRotes />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="logout" element={<LogOutPage />} />
                        <Route path="*" element={<Page404 />}/>
                    </Routes>
                    {
                        !page404 && <Footer />
                    }
                </AppContext.Provider>
            </Router>
            :

            <LoadingPage />
    );
};

export default App;