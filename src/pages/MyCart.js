import React, {useEffect, useContext, useState } from "react";
import UserContext from "../UserContext";
import UserCart from "../components/UserCart";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, FormGroup, FormControl, } from "react-bootstrap";
import emptyCartImg from "../images/empty-cart.png";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";


export default function MyCart ()  {
    const { user, userCart, fetchUserCart } = useContext(UserContext);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discountCode, setDiscountCode] = useState("");
    const history = useHistory();

    const sumAmount = () => {
        if (userCart.length > 0) {
            let total = userCart.map(item => {
                return item.subtotal;
            }).reduce((initial, current) => {
                return initial + current;
            })
            setTotalAmount(total)
        } else {
            setTotalAmount(0)
        }
    }
    
    const checkout = async () => {
        fetchUserCart()
        fetch(`${process.env.REACT_APP_API_URL}/users/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
                discountCode: discountCode.toUpperCase()
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

    }

    useEffect(() => {
        sumAmount();
    }, [userCart])
    
    let isCartEmpty = (userCart.length) ?
    (
        <>

        <Container>
            <Row className="text-center d-none d-md-flex">
                <Col md={8} className="text-left"><h4>Product</h4></Col>
                <Col md={2}><h4></h4></Col>
                <Col md={2}><h4>Subtotal</h4></Col>
            </Row>
        </Container>
           <UserCart userCart={userCart}/>
            <hr></hr>
        <Container>
            <Row className="justify-content-end text-right text-md-center mt-4 mt-md-5">
                <Col md={2}><h3>Total</h3></Col>
                <Col md={2}><h5 className="mt-1 font-weight-bold">P{totalAmount.toLocaleString()}.00</h5></Col>
            </Row>
            <Row className="justify-content-end mt-2">
                <Col md={4} lg={3} className="text-right">
                    <FormGroup>
                        <FormControl value={discountCode} onChange={e => setDiscountCode(e.target.value)} type="text" placeholder="Enter Voucher Code"></FormControl>
                    </FormGroup>
                </Col>
                <Col md={12} onClick={()=> checkout()} className="d-md-none mt-2 mb-5 mx-auto"><Button className="themeColor py-2 btn-block font-weight-bold">Checkout</Button></Col>
                <Col md={12} onClick={()=> checkout()} className="d-none d-md-block mt-2 mb-4 mx-auto"><Button className="themeColor float-right py-2 px-5 font-weight-bold">Checkout</Button></Col>
            </Row>
        </Container>

        </>
    ) :
    ( 
        <>
        <Container className="mt-2 mt-md-5 pt-md-5 text-center">
            <img src={emptyCartImg} width="150" alt="Image of a sad, empty cart" className="img-fluid m-4 m-md-5"/>
            <h3 className="my-3">Your cart is empty!</h3>
            <p><Link to={"/products"}>Add items</Link> to your cart and see them here.</p>
        </Container>
        </>
    )

    return(
        <>
        <Container className="mt-2 mt-md-5">
        <h2 className="my-4">My Cart</h2>

        {isCartEmpty}
        
        </Container>
        </>


    )
}