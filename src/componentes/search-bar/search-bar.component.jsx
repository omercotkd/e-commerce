import React from "react";

import "./search-bar.style.css";

const SearchBar = (props) => {


    const hadnleChange = (event) => {
        const { name, value } = event.target;
        props.setValue(value);
    }

    return(
        <input value={props.value} onChange={hadnleChange} placeholder="...חפש מוצר" className="search-field" type="text" />
    )

};

export default SearchBar;