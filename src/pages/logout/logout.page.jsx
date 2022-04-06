import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import { AppContext } from "../../app";
import LoadingPage from "../loading/loading.page";

const LogOutPage = () => {

    const cAlert = useAlert();

    const navigate = useNavigate();

    const { userState, setUserState, setUserStateChanged } = useContext(AppContext);

    useEffect(() => {
        if (userState) {
            fetch("/api/log-out")
                .then(() => {
                    cAlert.info("התנתקת בהצלחה");
                    setUserState(false);
                    setUserStateChanged(true);
                    navigate("/");
                });
        } else {
            navigate("/");
        };
    }, []);

    return (
        <div className="web-page">
            <LoadingPage />
        </div>
    );

};

export default LogOutPage;