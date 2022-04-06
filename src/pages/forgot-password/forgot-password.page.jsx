import React, { useState, useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import InputField from "../../componentes/input-field/input-field.component";
import { requestPasswordResetLink } from "../../functions/change-password";
import { validEmail } from "../../functions/string-validators";
import { AppContext } from "../../app";
import { useAlert } from 'react-alert';
import "./forgot-password.style.css";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {

    const cAlert = useAlert();

    const { userState } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (userState) {
            navigate("/myAccount");
        };
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;

        setEmailToReset(prevVelues => (
            {
                ...prevVelues,
                [name]: {
                    ...emailToReset[name],
                    value: value,

                }
            }
        ));
    };

    const [emailToReset, setEmailToReset] = useState({
        email: {
            name: "email",
            placeholder: "אימייל",
            onChange: handleChange,
            value: "",
            fieldType: "email"
        },
        confirmEmail: {
            name: "confirmEmail",
            placeholder: "אישור אימייל",
            onChange: handleChange,
            value: "",
            fieldType: "email"
        }
    })


    const handleSubmit = async () => {


        if (!validEmail(emailToReset.email.value)) {
            cAlert.error("אימייל לא תקין");
            return;
        } else if (emailToReset.email.value !== emailToReset.confirmEmail.value) {
            cAlert.error("אימיילים לא תואמים");
            return;
        };

        const response = await requestPasswordResetLink(emailToReset.email.value);
        if (response) {
            cAlert.success("אם השמתמש קיים לינק לאיפוס סיסמה נשלח");
            setEmailToReset({
                email: {
                    name: "email",
                    placeholder: "אימייל",
                    onChange: handleChange,
                    value: "",
                    fieldType: "email"
                },
                confirmEmail: {
                    name: "confirmEmail",
                    placeholder: "אישור אימייל",
                    onChange: handleChange,
                    value: "",
                    fieldType: "email"
                }
            });
        } else {
            cAlert.error("משהו השתבש נסה שוב");
        };



    };

    return (
        <div className="web-page">
            <Container className="forgot-password-form">
                <h1>:איפוס סיסמה</h1>
                <form>
                    <InputField object={emailToReset.email} />
                    <InputField object={emailToReset.confirmEmail} />
                    <Button onClick={handleSubmit} size="lg" className="send-reset-btn">שלח קישור לאיפוס סיסמה</Button>
                </form>
            </Container>
        </div>
    )

};
export default ForgotPasswordPage;