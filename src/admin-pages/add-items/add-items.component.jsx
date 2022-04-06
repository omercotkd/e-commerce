import React, { useState } from "react";

import InputField from "../../componentes/input-field/input-field.component";
import ChooseTag from "../../componentes/choose-tag/choose-tag.component";
import SubmitButton from "../../componentes/buttons/submit-button/submit-button.component";

import checkNumbers from "../../functions/checkNumbers";
import cleanSizes from "../../functions/cleanSizes";

import "./add-items.style.css";
import { Container } from "react-bootstrap";

const AddItemsPage = () => {

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewProductInfo(prevVelues => (
            {
                ...prevVelues,
                [name]: {
                    ...prevVelues[name],
                    value: value
                }
            }
        ));
    };

    const handleFiles = (event) => {
        setImagesFile(event.target.files);

    };

    const [newProductInfo, setNewProductInfo] = useState({
        name: {
            name: "name",
            placeholder: "שם המוצר",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: true
        },
        price: {
            name: "price",
            placeholder: "מחיר",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: true
        },
        coachPrice: {
            name: "coachPrice",
            placeholder: "מחיר למאמן",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: false
        },
        description: {
            name: "description",
            placeholder: "תיאור המוצר",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: true
        },
        sizes: {
            name: "sizes",
            placeholder: "(רשימה) צבעים/מידות/קושי",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: false
        },
        priceJump: {
            name: "priceJump",
            placeholder: "הבדל מחיר בין מידות",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: false
        },
        priceJumpCoach: {
            name: "priceJumpCoach",
            placeholder: "הבדל מחיר בין מידות למאמן",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: false
        },
        sizesText: {
            name: "sizesText",
            placeholder: "הטקסט שיוצג על יד רשימת הקושי",
            onChange: handleChange,
            value: "",
            fieldType: "text",
            require: false
        }

    });

    const [newProductTag, setNewProductTag] = useState("");

    const [imagesFiles, setImagesFile] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // checks if the stared fields are filled
        if (newProductInfo.name.value.length === 0 || newProductInfo.price.value.length == 0 || newProductInfo.description.value.length == 0) {
            return alert("מלא את כל הערכים שמסומנים בכוכבית");
        };

        // checks if the prices that where provided are valid numbers, including float numbers
        if (!(checkNumbers(newProductInfo.price.value) && checkNumbers(newProductInfo.coachPrice.value))) {
            return alert("המחיר שהוכנס שגוי");
        };

        // checks if the price jumps are vlaid numbers if the product has sizes
        if (newProductInfo.sizes.value && !(checkNumbers(newProductInfo.priceJump.value) && checkNumbers(newProductInfo.priceJumpCoach.value))) {
            return alert("הבדלי מחיר שגויים");
        };

        // checks if there is a text for sizes if the product has sizes
        if (newProductInfo.sizes.value && !newProductInfo.sizesText.value) {
            return alert("בבקשה ספק טקסט למידות");
        }

        const testSizes = cleanSizes(newProductInfo.sizes.value)
        // checks the sizes if its a valid one and refomat it if needed
        if (!testSizes) {
            return alert("בדוק את שדה המידות");
        } else {
            if (testSizes === "true") {
                newProductInfo.sizes.value = "";

            } else {
                newProductInfo.sizes.value = testSizes;
            };

        };

        // checks if a file was provided
        if (imagesFiles === "") {
            return alert("לא צירפת תמונה")
        };

        // create a data object to send to the backend
        const data = new FormData();

        let numFiles = 0;

        for (const file of imagesFiles) {
            data.append(`file${numFiles}`, file);
            numFiles += 1;
        };

        Object.keys(newProductInfo).map(key => data.append(key, newProductInfo[key].value));

        data.append("group", newProductTag);

        // send the data to the backend 
        fetch("/api/admin/add-products", {
            method: "POST",
            body: data
        }).then(res => {
            // checks the response status and return an alert if needed
            if (!res.ok) {
                return res.text().then(text => alert(text));
            } else {
                alert("המוצר התווסף");
                return true;
            }
        });
    };

    return (
        <div className="web-page">
            <Container className="add-item-form">
                <form >
                    {
                        Object.keys(newProductInfo).map((oKey, index) => <InputField object={newProductInfo[oKey]} key={index} />)
                    }
                    <ChooseTag onChange={setNewProductTag} />
                    <input type="file" name="file" onChange={handleFiles} multiple="multiple" className="upload-file" />
                    <br />
                    <SubmitButton onClick={handleSubmit} text={"הוסף מוצר"} />
                </form>
            </Container>
        </div>
    );
};

export default AddItemsPage;