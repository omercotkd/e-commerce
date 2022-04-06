import React, { useEffect, useState } from "react";
import LoadingPage from "../../pages/loading/loading.page";
import { useAlert } from "react-alert";

const ManageUsersPage = () => {

    const cAlert = useAlert();

    const [allUsers, setAllUsers] = useState();

    const [apiRespond, setApiRespond] = useState(false);

    useEffect(() => {
        (async () => {

            const response = await fetch("/api/admin/get-all-users");
            if (response.ok) {
                const data = await response.json();
                setAllUsers(data);
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
                apiRespond ?
                    <div>

                    </div>
                    :
                    <LoadingPage />
            }
        </div>
    );
};

export default ManageUsersPage;