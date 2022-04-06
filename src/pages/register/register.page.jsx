import React, { useState, useContext, useEffect } from "react";

import InputField from "../../componentes/input-field/input-field.component";
import { Button, Container } from "react-bootstrap";

import { validEmail, validPassword, validPhoneNumber } from "../../functions/string-validators";
import { AppContext } from "../../app";
import { useAlert } from 'react-alert'

import "./register-page.style.css";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../loading/loading.page";
import checkNumbers from "../../functions/checkNumbers";

// create a diffrent handle change for the phone number
const RegisterPage = () => {

    const cAlert = useAlert();

    const navigate = useNavigate();

    const { userState, setUserState, setUserStateChanged } = useContext(AppContext);

    const [showLoadingPage, setShowLoadingPage] = useState();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setRegisterData(prevVelues => (
            {
                ...prevVelues,
                [name]: {
                    ...registerData[name],
                    value: value,

                }
            }
        ));
    };

    const [registerData, setRegisterData] = useState({
        email: {
            name: "email",
            placeholder: "אימייל",
            onChange: handleChange,
            value: "",
            fieldType: "email",
            require: true
        },
        confirmEmail: {
            name: "confirmEmail",
            placeholder: "אישור אימייל",
            onChange: handleChange,
            value: "",
            fieldType: "email",
            require: true
        },
        firstName: {
            name: "firstName",
            placeholder: "שם פרטי",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: true
        },
        lastName: {
            name: "lastName",
            placeholder: "שם משפחה",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: true
        },
        password: {
            name: "password",
            placeholder: "סיסמה",
            onChange: handleChange,
            value: "",
            fieldType: "password",
            require: true
        },
        confirmPassword: {
            name: "confirmPassword",
            placeholder: "אישור סיסמה",
            onChange: handleChange,
            value: "",
            fieldType: "password",
            require: true
        },
        phoneNumber: {
            name: "phoneNumber",
            placeholder: "מספר פלאפון",
            onChange: handleChange,
            value: "",
            fieldType: "tel",
            require: true,
        },
        address: {
            name: "address",
            placeholder: "כתובת",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: false,
        },
        companyName: {
            name: "companyName",
            placeholder: "שם חברה/עמותה",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: false,
        },
        companyId: {
            name: "companyId",
            placeholder: "מספר עוסק",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: false,
        }
    });


    const handleSubmit = async () => {

        // checks if all the reqeuird fields are provided
        let allRequireFieldsFilled = true;
        Object.keys(registerData).map(item => {
            if (registerData[item].require && allRequireFieldsFilled) {
                if (!registerData[item].value) {
                    allRequireFieldsFilled = false
                };
            };
        });

        const email = registerData.email.value;
        const password = registerData.password.value;

        // valid all the fields that need some sord of valdition
        if (!allRequireFieldsFilled) {
            cAlert.error("חסר מידע בבקשה מלא את כל השדות המסומנים בכוכבית");
            return false;
        } else if (!validEmail(email)) {
            cAlert.error("אימייל לא תקין");
            return false;
        } else if (!(email === registerData.confirmEmail.value)) {
            cAlert.error("אימליים לא תואמים");
            return false;
        } else if (!validPassword(password)) {
            cAlert.error("סיסמה צריכה להכיל בין 8 ל 32 תווים, אותיות באנגלית ומספרים");
            return false;
        } else if (!(password === registerData.confirmPassword.value)) {
            cAlert.error("סיסמאות לא תואמות");
            return false;
        } else if (! await validPhoneNumber(registerData.phoneNumber.value)) {
            cAlert.error("מספר פלאפון לא תיקני");
            return false;
        } else if (registerData.companyId.value && !checkNumbers(registerData.companyId.value)) {
            cAlert.info("מספר החברה יכול להכיל רק מספרים");
            return;
        };

        const data = new FormData();

        // append the registerion data to the form object
        data.append("first_name", registerData.firstName.value);
        data.append("last_name", registerData.lastName.value);
        data.append("email", email);
        data.append("password", password);
        data.append("phone_number", registerData.phoneNumber.value);
        data.append("address", registerData.address.value);
        data.append("company_id", registerData.companyId.value);
        data.append("company_name", registerData.companyName.value);

        setShowLoadingPage(true);
        const response = await fetch("/api/register", { method: "POST", body: data })

        if (!response.ok) {
            // check for diffrent res code that  will redirect to login page if user exists
            if (response.status === 303) {
                navigate("/login");
            };
            setShowLoadingPage(false);
            return response.text().then(text => cAlert.error(text));
        } else {
            response.text().then(text => cAlert.success(text));
            setUserState(true);
            setUserStateChanged(true);
        };


    };

    useEffect(() => {
        if (userState) {
            navigate("/");
        };
    }, [userState]);

    return (
        <div className="web-page">
            {!showLoadingPage
                ?
                <Container className="register-form">
                    <h1>:רישום משתמש</h1>
                    <form>
                        {
                            Object.keys(registerData).map((item, index) => <InputField key={index} object={registerData[item]} />)
                        }

                        <p>השדות המסומנים בכוכבית הם חובה<mark className="red-mark">*</mark></p>
                        <Button onClick={handleSubmit} variant="primary" size="lg" className="register-submit-btn">צור משתמש</Button>

                    </form>
                </Container>
                :
                <LoadingPage />
            }
        </div>
    );
};

export default RegisterPage;