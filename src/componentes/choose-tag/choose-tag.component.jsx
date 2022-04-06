import React from "react";

import "./choose-tag.style.css";

const ChooseTag = (props) => {

    const handleTagChange = (event) => {
        const { value } = event.target
        props.onChange(value)
    };


    return(
        <div>    
            <select onChange={handleTagChange}>
                <option value="">ללא תיוג</option>
                <option value="sport">ספורט</option>
                <option value="martial-arts">אומניות לחימה</option>
            </select>
            <span>בחר תיוג למוצר, אפשר לבחור רק אחד</span>
        </div>
    );

};

export default ChooseTag;