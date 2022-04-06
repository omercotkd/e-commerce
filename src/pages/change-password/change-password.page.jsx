import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputField from "../../componentes/input-field/input-field.component";
import { changePassword } from "../../functions/change-password";
import { useAlert } from 'react-alert';
import { validPassword } from "../../functions/string-validators";

import "./change-password-page.style.css";

const ChangePasswordPage = () => {

    const cAlert = useAlert();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setNewPassword(prevVelues => (
            {
                ...prevVelues,
                [name]: {
                    ...prevVelues[name],
                    value: value,

                }
            }
        ));
    };

    const [newPassword, setNewPassword] = useState({
        password: {
            name: "password",
            placeholder: "סיסמה חדשה",
            onChange: handleChange,
            value: "",
            fieldType: "password"
        },
        confirmPassword: {
            name: "confirmPassword",
            placeholder: "אישור סיסמה",
            onChange: handleChange,
            value: "",
            fieldType: "password"
        }
    });

    const navigate = useNavigate();

    const handleSubmit = async() => {
        if(!validPassword(newPassword.password.value)){
            cAlert.error("סיסמה צריכה להכיל בין 8 ל 32 תווים, אותיות באנגלית ומספרים");
            return;
        }else if(newPassword.password.value != newPassword.confirmPassword.value){
            cAlert.error("סיסמאות לא תואמות");
            return;
        };

        const response = await changePassword(newPassword.password.value);
        if(response){
            cAlert.success("סיסמה שונתה");
            navigate("/myAccount");
        }else{
            cAlert.error("שגיאה, בדוק אם הסיסמה תיקנית ושהאימייל אושר ונסה שנית");
        };

    };

    return (
        <div className="web-page">
            <Container >
                <form className="change-password-form">
                    <InputField object={newPassword.password} />
                    <InputField object={newPassword.confirmPassword} />
                    <Button onClick={handleSubmit} size="lg" className="change-password-btn">שנה סיסמה</Button>
                </form>
            </Container>
        </div>
    )
};

export default ChangePasswordPage;