import React from "react";
import { useNavigate } from "react-router-dom";

import "./slider-item.style.css";

const SliderItem = (props) => {
    
    const navigate = useNavigate();
    
    return(
        <div onClick={() => navigate(props.object.navTo)} className="home-slider-item">
            <div style={{
                backgroundImage: `url(${window.location.origin.toString()}${props.object.image})`
            }}  className="background-image"
            >
                <div className="content">
                    <h1 className="title">{props.object.title}</h1>
                <span className="subtitle"> SHOP NOW</span>
                </div>
            </div>
        
        </div>
    )
};

export default SliderItem;