import React, { useEffect, useState } from "react";
import { Row, Col, Accordion, Button } from "react-bootstrap";
import Order from "./Order";


export default function MyOrders ({props}) {

    const [ordersArray, setOrdersArray] = useState([]);
    const getOrders = () => {
        if (props.length) {
            const orders = props.map(object => {
                let saved = object.products.map(product => {return product.subtotal}).reduce((init, curr) => {return init + curr})
                return (
                    <>
                    <Row className="mx-auto mt-3 mt-md-4" style={{width: "100%"}} >
                        <Col md={6} lg={3} className="font-weight-bold">Date: {object.purchasedOn.slice(0,10)}</Col>
                        <Col md={6} lg={4}>Order ID: {object._id}</Col>
                        <Col md={6} lg={2}>Items: {object.totalItems}</Col>
                        <Col md={6} lg={3} >Total Amount: <span className="font-italic">&#8369;{object.totalAmount.toLocaleString()}</span></Col>
                        <Col><span className="mt-md-2" style={{display: object.discountCode ? "block" : "none"}}>Discount code: {object.discountCode} (&#8369; {(saved - object.totalAmount).toLocaleString()} saved)</span></Col>
                        <Col xs={12}>
                            <Accordion defaultActiveKey="">
                                <Accordion.Toggle as={Button} variant="link" className="text-info" eventKey="0">
                                    Click to see products
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                <Col md={10} lg={8}>
                                    <Order products={object.products}/>
                                </Col>
                                </Accordion.Collapse>
                            </Accordion>
                       <hr></hr>
                        </Col>                        
                    </Row>
                    </>
                ) 
            })
            setOrdersArray(orders);


        } else setOrdersArray([]);
    }

    useEffect(() => {
        getOrders();
    }, [props])
    
    return(
        <>
            {ordersArray}
        </>
        
    );
}