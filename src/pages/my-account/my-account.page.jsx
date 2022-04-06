import React, { useEffect, useState, useContext } from "react";
import LoadingPage from "../loading/loading.page";
import { AppContext } from "../../app";
import { getUserData } from "../../functions/userStateFunctions";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import ConfirmEmailMsg from "../../componentes/confirm-email-msg/confirm-email-msg.component";
import PersonIcon from '@mui/icons-material/Person';
import InputField from "../../componentes/input-field/input-field.component";
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import { useAlert } from 'react-alert';
import "./my-account-page.style.css";
import { validPhoneNumber } from "../../functions/string-validators";
import checkNumbers from "../../functions/checkNumbers";

const MyAccountPage = () => {

    const cAlert = useAlert();

    const [userDataChanged, setUserDataChanged] = useState(false);

    const [gotUserInfo, setGotUserInfo] = useState(false);

    const [userInfo, setUserInfo] = useState();

    const { userState } = useContext(AppContext);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setUserDataChanged(true);
        const { name, value } = event.target;

        setUserInfo(prevVelues => (
            {
                ...prevVelues,
                [name]: {
                    ...prevVelues[name],
                    value: value,

                }
            }
        ));
    };

    useEffect(() => {

        if (!userState) {
            navigate("/login");
        } else {

            (async () => {
                const data = await getUserData();
                if (!data) {
                    navigate("/login");
                } else {
                    setUserInfo({
                        fName: {
                            name: "fName",
                            placeholder: "שם פרטי",
                            onChange: handleChange,
                            value: data.name,
                            fieldType: "text",
                        },
                        lName: {
                            name: "lName",
                            placeholder: "שם משפחה",
                            onChange: handleChange,
                            value: data.last_name,
                            fieldType: "text",
                        },
                        email: data.email,
                        emailConfirmed: data.confirmed_email,
                        adderss: {
                            name: "adderss",
                            placeholder: "כתובת",
                            onChange: handleChange,
                            value: data.adderss,
                            fieldType: "text",
                        },
                        phoneNumber: {
                            name: "phoneNumber",
                            placeholder: "מספר פלאפון",
                            onChange: handleChange,
                            value: data.phone,
                            fieldType: "tel",
                        },
                        companyName: {
                            name: "companyName",
                            placeholder: "שם חברה/עמותה",
                            onChange: handleChange,
                            value: data.company_name,
                            fieldType: "text",
                        },
                        companyId: {
                            name: "companyId",
                            placeholder: "מספר עמותה/חברה",
                            onChange: handleChange,
                            value: data.company_id,
                            fieldType: "text",
                        }
                    });
                    setGotUserInfo(true);
                };

            })();
        };
    }, []);


    const handleChangePasswordClick = () => {
        if (!userInfo.emailConfirmed) {
            cAlert.info("אשר את האימייל קודם כל");
            return;
        } else {
            navigate("change-password");
        }
    };

    const handleNewDataSubmiton = async () => {
        if (userDataChanged) {
            setUserDataChanged(false);
            if (!userInfo.fName.value || !userInfo.lName.value || !userInfo.phoneNumber.value) {
                cAlert.info("לא ניתן להשאיר את שדה השם, שם משפחה ופלאפון ריקים");
                return;
            } else if (! await validPhoneNumber(userInfo.phoneNumber.value)) {
                cAlert.info("מספר פלאפון לא תקני");
                return;
            } else if (userInfo.companyId.value && !checkNumbers(userInfo.companyId.value)) {
                cAlert.info("מספר החברה יכול להכיל רק מספרים");
                return;
            }

            const data = new FormData();
            data.append("fName", userInfo.fName.value);
            data.append("lName", userInfo.lName.value);
            data.append("phone", userInfo.phoneNumber.value);
            data.append("address", userInfo.adderss.value);
            data.append("companyId", userInfo.companyId.value);
            data.append("companyName", userInfo.companyName.value);

            const response = await fetch("/api/update-user-info", { method: "POST", body: data });

            if (!response.ok) {
                response.text().then(text => cAlert.error(text));
                return;
            } else {
                cAlert.success("השינוים נשמרו בהצלחה");
            };

        } else {
            cAlert.info("לא התבצע שום שינוי");
        };
    };


    return (
        <div className="web-page">
            {
                gotUserInfo

                    ?

                    <div className="my-account-page">
                        {
                            !userInfo.emailConfirmed && <ConfirmEmailMsg />
                        }
                        <Container>
                            <h1>פרטים אישים <PersonIcon fontSize="large" /></h1>
                            <p>{userInfo.email}</p>
                            <InputField object={userInfo.fName} />
                            <InputField object={userInfo.lName} />
                            <InputField object={userInfo.phoneNumber} />
                            <InputField object={userInfo.adderss} />
                            <InputField object={userInfo.companyName} />
                            <InputField object={userInfo.companyId} />
                            <Button onClick={handleChangePasswordClick} className={"my-account-btns"}>שנה סיסמה <LockIcon /></Button>
                            <Button onClick={() => navigate("orders")} className={"my-account-btns"}>ההזמנות שלך</Button>
                            <Button onClick={handleNewDataSubmiton} disabled={!userDataChanged} className={"my-account-btns"}>שמור שינויים <SaveIcon /></Button>
                        </Container>
                    </div>

                    :

                    <LoadingPage />
            }
        </div>
    );

};
export default MyAccountPage;