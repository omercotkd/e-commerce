import React, { useState, useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';
import { AppContext } from "../../app";

import { validEmail, validPassword } from "../../functions/string-validators";

import InputField from "../../componentes/input-field/input-field.component";

import "./login-page.style.css";

const LoginPage = () => {

    const cAlert = useAlert();

    const { userState, setUserState, setUserStateChanged } = useContext(AppContext);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserInfo(prevVelues => (
            {
                ...prevVelues,
                [name]: {
                    ...userInfo[name],
                    value: value,

                }
            }
        ));
    };

    const [userInfo, setUserInfo] = useState({
        email: {
            name: "email",
            placeholder: "אימייל",
            onChange: handleChange,
            value: "",
            fieldType: "email"
        },
        password: {
            name: "password",
            placeholder: "סיסמה",
            onChange: handleChange,
            value: "",
            fieldType: "password"
        }
    });

    const handleSubmit = async () => {
        const userEmail = userInfo.email.value;
        const userPassword = userInfo.password.value;

        // test email and password to reduce the amount of requests to the server
        if (!validEmail(userEmail)) {
            cAlert.error("אימייל לא תקין");
            return;
        } else if (!validPassword(userPassword)) {
            cAlert.error("סיסמה לא תקנית", { timeout: 5000 });
            return;
        };

        // create a form object and send the password and email to the server to try and login the user
        const data = new FormData();

        data.append("email", userEmail);
        data.append("password", userPassword);

        const response = await fetch("/api/login", { method: "POST", body: data });

        if (!response.ok) {
            return response.text().then(text => cAlert.error(text));
        } else {
            cAlert.success("התחברת בהצלחה");
            setUserState(true);
            setUserStateChanged(true);
        };



    };

    // if a user is alredy connected will redirect to home page
    useEffect(() => {
        if (userState) {
            navigate("/");
        };

    }, [userState])

    return (
        <div className="web-page">
            <Container className="login-form">
                <h1>:התחברות</h1>
                <form >
                    <InputField object={userInfo.email} />
                    <InputField object={userInfo.password} />

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                        className="submit-login-form"
                    >כניסה
                    </Button>

                </form>
                <Button
                    onClick={() => navigate("/forgot-password")}
                    variant="primary"
                    size="lg"
                    className="forgot-password-btn"
                >שחכתי את הסיסמה
                </Button>
            </Container>
        </div>
    );
};

export default LoginPage;