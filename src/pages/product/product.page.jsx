import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../app";
import ImageSlider from "../../componentes/image-slider/image-slider.component";
import ProductSizes from "../../componentes/product-size/product-size.component";
import ItemCounter from "../../componentes/item-counter/item-counter.component";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addCartItem, getCartItems, setCartItems } from "../../functions/cart-functions";
import "./product-page.style.css";

// maybe check if in stock
const ProductPage = () => {

    const navigate = useNavigate();

    const { userState, allProducts } = useContext(AppContext);

    const [product, setProduct] = useState(false);

    const [price, setPrice] = useState();

    const [orderSizes, setOrderSizes] = useState(false);

    const [itemAmount, setItemAmount] = useState();

    const params = useParams();


    useEffect(() => {
        // set the product only if allProducts alredy exsits
        if (allProducts && !product) {
            setProduct(...allProducts.filter(item => item.id == params.id));
        };
        // checks if the id is a valid one if not will redirect to the shop page
        if (params.id > allProducts.length) {
            navigate("/shop");
        };
        // will set the price if product is alredy been set
        if (product) {
            setPrice(product.price);
        };
        setItemAmount(1);
    }, [allProducts, product]);

    const handleAddToCart = async () => {

        const prevItems = await getCartItems(userState);

        const newCart = await addCartItem(
            prevItems ? prevItems : [],
            params.id,
            orderSizes ? `${product.name} ${product.sizes_text}: ${orderSizes}` : product.name,
            itemAmount,
            price
        );
        
        setCartItems(userState, newCart);
        setItemAmount(1);

    };

    return (
        <div className="web-page">
            {
                product ?

                <Container className="product-page">
                    <Row>
                        <Col>
                            <h1>{product.name}</h1>
                            <h2>{product.description}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>₪{price}  מחיר</h2>
                            <ItemCounter count={itemAmount} countFunc={setItemAmount} />
                            {   // if there are sizes to the product will render the sizes component
                                product.sizes &&
                                <ProductSizes
                                    text={product.sizes_text}
                                    jump={product.price_jump}
                                    sizes={product.sizes}
                                    price={product.price}
                                    priceFunc={setPrice}
                                    sizesFunc={setOrderSizes}
                                />
                            }

                        </Col>
                        <Col>
                            <ImageSlider id={product.id} numberImages={product.number_images} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={handleAddToCart} variant="outline-success" size="lg">הוסף לעגלה <AddShoppingCartIcon/></Button>
                        </Col>
                        <Col></Col>
                    </Row>

                </Container>

                :

                <h1>Loading...</h1>
            }
        </div>

    );


};

export default ProductPage;