import React, { useEffect, useState } from "react";

import { getUserOrders } from "../../functions/get-orders";

import OrdersSummary from "../../componentes/orders-summary/orders-summary.component";
import LoadingPage from "../loading/loading.page";
import { Container } from "react-bootstrap";

const MyOrdersPage = () => {

    const [apiRespond, setApiRespond] = useState(false);

    const [notDeliverdOrders, setNotDeliverdOrders] = useState([]);

    const [deliverdOrders, setDeliverdOrders] = useState([]);


    useEffect(() => {
        (async () => {
            const data = await getUserOrders();

            setDeliverdOrders(data.filter(item => item.delivered).reverse());
            setNotDeliverdOrders(data.filter(item => !item.delivered).reverse());
        })();
        setApiRespond(true);
    }, [])

    return (

        <div className="web-page">
            {
                apiRespond
                    ?

                    !notDeliverdOrders.length && !deliverdOrders.length
                        ?
                        // change it to a nicer looking massage maybe a diffrant compoennt
                        <h1>No orders</h1>
                        :
                        <Container>
                            <h1>:הזמנות שלא נמסרו</h1>
                            <OrdersSummary orders={notDeliverdOrders} delivered={false}/>
                            <h1>:הזמנות שנמסרו</h1>
                            <OrdersSummary orders={deliverdOrders} delivered={true}/>
                        </Container>

                    :
                    <LoadingPage />
            }
        </div>



    )
};

export default MyOrdersPage;