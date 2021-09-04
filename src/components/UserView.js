import React, { useContext, useEffect, useState } from "react";
import Product from "./Product"
import { Row, Col, Container } from "react-bootstrap"
import UserContext from "../UserContext";

export default function UserView ({productData}) {
    const { cartCount, changeDocTitle } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const productsArray = productData.map(product => {
            if (product.isActive) {
                return(
                    <Col className="my-2 my-md-3 mx-auto" sm={10} md={8} lg={6} xl={4}>
                    <Product key={product._id} productProp={product} />
                    </Col>
                )
            } else {
                return null;
            }
        })
        setProducts(productsArray);
    }, [productData])

    useEffect(() => {
        changeDocTitle(cartCount > 0 ? `G.B. Music: Products (${cartCount})` : "G.B. Music: Products")
    }, [cartCount])

    return(
        <>
            <h1 className="ml-2 ml-md-3 mt-3 mt-md-5">All Products</h1>
            <Row className="my-2 my-md-3">
                {products}
            </Row>
        </>
    )
}