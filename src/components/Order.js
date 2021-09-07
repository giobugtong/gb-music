import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Order ({products}) {
    const rawProducts = [...products]
    const [orderedProducts, setOrderedProducts] = useState([]);
    
    const getOrderedProducts = () => {
        if (products) {
            const productsOrdered = rawProducts.map(product => {
                return(
                    <>
                        <Col className="px-0 text-left mb-2" xs={12} sm={6} md={5}><Link className="text-dark font-weight-bold" to={`/products/${product.productId}`}>{product.brandName} {product.modelName}</Link></Col>
                        <Col className="px-0 mb-auto" xs={4} sm={2} md={3}>{product.quantity} <span>{product.quantity > 1 ? "pcs" : "pc" }</span></Col>
                        <Col className="px-0 mb-auto" xs={8} sm={4} md={4}>&#8369;{product.subtotal.toLocaleString()}.00</Col>

                    </>
                )
            })
            setOrderedProducts(productsOrdered)
        } else setOrderedProducts([]);
    }

    useEffect(() => {
        getOrderedProducts()
    }, [])
    
    return(
        <>
        <Row className="ml-0 ml-md-3 align-items-start text-center">
            {orderedProducts}
        </Row>            
        </>
        
    );
}