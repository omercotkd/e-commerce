import React from "react";

import HomePageHeader from "../../componentes/home-page-header/home-page-header.component";

import "./home-page.style.css";
import CategorySlider from "../../componentes/category-slider/category-slider.component";

const HomePage = () => {
    return (
        <div className="web-page home-page">
            <HomePageHeader />
            <CategorySlider />
        </div>
    );
};

export default HomePage;