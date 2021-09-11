import React, {useEffect, useContext, useState } from "react";
import EmptyCart from "./EmptyCart"
import UserContext from "../UserContext";
import UserCart from "../components/UserCart";
import { Container, Row, Col, Button, FormGroup, FormControl } from "react-bootstrap";
import Swal from "sweetalert2";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

export default function MyCart ()  {
    const { user, userCart, fetchUserCart, changeDocTitle, cartCount } = useContext(UserContext);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discountCode, setDiscountCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorStyle, setErrorStyle] = useState("");

    const sumAmount = () => {
        if (userCart.length > 0) {
            let total = userCart.map(item => {
                return item.subtotal;
            }).reduce((initial, current) => {
                return initial + current;
            })
            setTotalAmount(total)
        }
    }
    
    const checkout = () => {
        if (!userCart) {
            setErrorMessage("There are no items in your cart!");
        } else if (discountCode === "FULLSTACK30" || discountCode === "BACKEND20" || discountCode === "FRONTEND15" || discountCode === "") {
            setErrorMessage("");
            setErrorStyle("");
            fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    discountCode: discountCode
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.orderPlaced) {
                    Swal.fire({
                        icon: "success",
                        title: "Order placed!",
                        text: "Thank you for your purchase. View your orders in My Profile.",
                        showConfirmButton: true,
                        confirmButtonText: "Go to My Profile",
                        showDenyButton: true,
                        denyButtonText: "Keep shopping"
                    })
                    .then(result => {
                        if (result.isConfirmed) {
                            window.location.replace("/profile");
                        } else if (result.isDenied) {
                            window.location.replace("/products");
                        }
                        fetchUserCart();
                    })
                }
            })
        } else {
            setErrorMessage("Invalid Voucher Code");
            setErrorStyle("border-danger");
        }

    }

    const removeAllCartItems = () => {

        Swal.fire({
            title: "Are you sure?",
            text: `This will remove ALL items in your cart.`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "I'm sure",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}/remove-all-cart-items`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.cartEmptied) {
                        const Toast = Swal.mixin({
                            toast: true,
                            icon: "question",
                            position: "top",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            showCloseButton: true
                          })
                        Toast.fire({
                            icon: "info",
                            title: "Cart emptied."
                        })
                        fetchUserCart();
    
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oh no.",
                            text: "Something went wrong",
                            showConfirmButton: false,
                            showCancelButton: true,
                            cancelButtonText: "Ok",
                            timer: 2500
                        })
                    }
                })
            }
        })
        
    }

    useEffect(() => {
        sumAmount();
        
    }, [userCart])

    useEffect(() => {
        changeDocTitle(cartCount > 0 ? `My Cart (${cartCount})` : `My Cart`)
    }, [cartCount])
    
    let isCartEmpty = (userCart.length) ?
    (   <>
        <Container>
            <Row className="text-center d-none d-md-flex">
                <Col md={8} className="text-left"><h5>Product</h5></Col>
                <Col md={2}><h5>Quantity</h5></Col>
                <Col md={2}><h5>Subtotal</h5></Col>
            </Row>
        </Container>
           {/* <UserCart userCart={userCart}/> */}
           <UserCart />
           
            <hr></hr>
        <Col xs={12} className="pb-3">
            <Link className="text-danger float-right" to="#" onClick={()=> removeAllCartItems()} >Remove all</Link>
        </Col>
        <Container>
            <Row className="justify-content-end text-right text-md-center mt-4 mt-md-5">
                <Col md={2}><h4>Total</h4></Col>
                <Col md={2}><h5 className="mt-1">P{totalAmount.toLocaleString()}.00</h5></Col>
            </Row>
            <Row className="justify-content-end mt-2">
                <Col md={4} lg={3} className="text-right">
                <div className="text-danger mb-3">{errorMessage}</div>
                    <FormGroup>
                        <FormControl className={errorStyle} value={discountCode} onChange={e => setDiscountCode(e.target.value)} type="text" placeholder="Enter Voucher Code"></FormControl>
                    </FormGroup>
                </Col>
                <Col md={12} onClick={()=> checkout()} className="d-md-none mt-2 mb-5 mx-auto"><Button className="themeColor py-2 btn-block font-weight-bold">Checkout</Button></Col>
                <Col md={12} className="d-none d-md-block mt-2 mb-4 mx-auto"><Button onClick={()=> checkout()} className="themeColor py-2 px-5 font-weight-bold float-right">Checkout</Button></Col>
            </Row>
        </Container>
        </>

    ) :
    ( 
        <EmptyCart />
    )

    return(
        <>
            <Marquee style={{color: "white"}, {backgroundColor: "white"}} gradientWidth={50} pauseOnHover gradient={true} speed={60} >
                <span>Use the following discount voucher codes at checkout:</span>
                <span className="mx-3">FRONTEND15</span>
                <span className="mx-3">BACKEND20</span>
                <span className="mx-3">FULLSTACK30</span>
            </Marquee>
        <Container className="mt-2 mt-md-5">
        <h2 className="my-4">My Cart</h2>

        {isCartEmpty}
        
        
        </Container>
        </>


    )
}