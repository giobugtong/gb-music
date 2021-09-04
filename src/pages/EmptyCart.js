import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../UserContext";
import { Fade, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import emptyCartImg from "../images/empty-cart.png";


export default function EmptyCart () {
    const { userCart, fetchUserCart } = useContext(UserContext);
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true);
        fetchUserCart();
    }, [])

    return(
        <>
        {
            !userCart.length && 
            <Fade in={show}>
            <Container className="mt-2 mt-md-5 pt-md-5 text-center">
                <img src={emptyCartImg} width="150" alt="Image of a sad, empty cart" className="img-fluid m-4 m-md-5"/>
                <h3 className="my-3">Your cart is empty!</h3>
                <p><Link to={"/products"}>Add items</Link> to your cart and see them here.</p>
            </Container>
            </Fade>
        }
        </>
    )
}