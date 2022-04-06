import React, { useEffect, useState } from "react";

import ProductSizeButton from "../buttons/product-size-button/product-size-button.component";

const ProductSizes = (props) => {
    
    const changePriceHandler = (index, size) => {
        // set what btn need to be bold right now
        setCorrentSize(props.sizes.split(",").map((item, ind) =>  ind == index? true : false ));
        // update the price tag based on the size
        props.priceFunc(props.price + index*props.jump);
        // update the selected size
        props.sizesFunc(size);

    };

    const [correntSize, setCorrentSize] = useState();

    useEffect(() => {  
        // by default the smalest size will be selected 
        setCorrentSize(props.sizes.split(",").map((item, index) =>  index == 0 ? true : false ));
        props.sizesFunc(props.sizes.split(",")[0]);
    }, []);

    return(
        <div>
            <h4>:{props.text}</h4>
            {props.sizes.split(",").map((item, index) => (<ProductSizeButton 
                                                            key={index} 
                                                            text={item} 
                                                            click={changePriceHandler} 
                                                            index={index}
                                                            isBold={correntSize}
                                                            />
                                                            ))}
        </div>
    );
};

export default ProductSizes;