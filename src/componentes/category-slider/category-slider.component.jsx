import React from "react";

import { Carousel } from "react-bootstrap";

import SliderItem from "../slider-item/slider-item.component";

import "./category-slider.style.css";

const CategorySlider = () => {



    const catagories = [{
        navTo: "/shop/sport",
        image: "/photos/menu-img/bands.png",
        title: "מוצרי ספורט"
    },
    {
        navTo: "/shop/martial-arts",
        image: "/photos/menu-img/suits.png",
        title: "אומניות לחימה"
    }]


    return (
        <Carousel fade indicators={false} nextLabel="" prevLabel="" interval={4000} variant="dark">
            <Carousel.Item >
                <SliderItem object={catagories[0]} />

            </Carousel.Item>
            <Carousel.Item >
                <SliderItem object={catagories[1]} />

            </Carousel.Item>

        </Carousel>
    )
};

export default CategorySlider;