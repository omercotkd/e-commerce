import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

import "./image-slider.style.css";

const ImageSlider = (props) => {
    
    const productImages = Array.from({ length: props.numberImages }, (x, i) => i).map(num => `/photos/products/product-${props.id}/image${num}.png`);

    const images = productImages.map(image => new Object({url: `${window.location.origin.toString()}${image}`}));
   
    return(

    <div>
        <SimpleImageSlider
            width={window.innerWidth < 800 ? 250 : 500}
            height={window.innerWidth < 800 ? 250 : 500}
            images={images}
            showBullets={true}
            showNavs={true}
            bgColor={null}
            navStyle={2}
        />
    </div>

    );

};

export default ImageSlider;