import React, { useEffect, useState } from "react";
import { useAlert } from 'react-alert';
import LoadingPage from "../../pages/loading/loading.page";
import { Container } from "react-bootstrap";


const AllOrdersPage = () => {

    const cAlert = useAlert();

    const [notDeliverdOrders, setNotDeliverdOrders] = useState([]);

    const [deliverdOrders, setDeliverdOrders] = useState([]);

    const [apiRespond, setApiRespond] = useState(false);

    useEffect(() => {

        (async () => {

            const response = await fetch("/api/admin/get-all-orders");
            if (response.ok) {
                const data = await response.json();
                setDeliverdOrders(data.filter(item => item.delivered).reverse());
                setNotDeliverdOrders(data.filter(item => !item.delivered).reverse());
                setApiRespond(true);
            } else {
                setApiRespond(true);
                cAlert.error("משהו השתבש נסה שנית");
            };

        })();

    }, []);

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

                        </Container>
                        
                    :
                    <LoadingPage />
            }
        </div>
    );

};

export default AllOrdersPage;