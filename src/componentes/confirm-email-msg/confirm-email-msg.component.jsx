import React from "react";
import { Button } from "react-bootstrap";
import { useAlert } from 'react-alert';
const ConfirmEmailMsg = () => {

    const cAlert = useAlert();

    const sendConfimEmail = async() => {
        const response = await fetch("/api/new-confiramtion-mail");
        if(response.ok){
            cAlert.success("אישור אימייל חדש נשלח");
        }else{
            cAlert.info("האימייל כבר אושר");
        }
    };

    return(
        <div>
            <h3 className="">עדין לא אישרת את האימייל כדי לבצע הזמנות צריך לאשר את האימייל</h3>
            <Button onClick={sendConfimEmail}>קבלת קישור חדש</Button>
        </div>
    )

};

export default ConfirmEmailMsg;