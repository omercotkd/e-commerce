import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../app";
import ProductBox from "../../componentes/prouduct-box/product-box.component";

import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import SearchBar from "../../componentes/search-bar/search-bar.component";

const ShopPage = () => {

    // gets the url paramas
    const params = useParams();

    const { allProducts } = useContext(AppContext);

    const [products, setProducts] = useState(false);

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {

        if(params.group){
            setProducts(allProducts.filter(product => product.group.includes(params.group) && (product.name.includes(searchValue) || product.description.includes(searchValue))));
        }else{
            setProducts(allProducts.filter(product => (product.name.includes(searchValue) || product.description.includes(searchValue))));
        };

    }, [params.group, searchValue])




    return (
        <div className="web-page">
            <SearchBar value={searchValue} setValue={setSearchValue} />
            <Container fluid>
                <Row>
                    {   // by checking if products is true the map will only work when products gets its velues
                        products && products.map((item, index) => <ProductBox key={index} product={item} />)
                    }
                </Row>
            </Container>
        </div>
    )

};

export default ShopPage;