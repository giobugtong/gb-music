import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Button, InputGroup, FormControl, Container, Fade } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function CartContents (props) {
    const {cartItemProp} = props;
    const { user, userCart, setUserCart, fetchUserCart } = useContext(UserContext);
    const { productId, brandName, modelName, quantity, price } = cartItemProp;
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const [decreaseButton, setDecreaseButton] = useState(true);
    const [show, setShow] = useState(false)

    const removeFromCart = () => {
            Swal.fire({
            title: "Hold on!",
            text: `Are you sure you want to remove ${brandName} ${modelName} from your cart?`,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Remove",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch((`${process.env.REACT_APP_API_URL}/users/${user.id}/remove-from-cart`), {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId: productId
                    })
                })
                .then(res => res.json())
                .then(data => {         
                    console.log("data.length is " + data.length)
                    console.log("userCart.length is " + userCart.length)
                   
                    if (data.emptyBody || data.notInCart) {
                        Swal.fire({
                            title: `Oops! :(`,
                            icon: "error",
                            text: "Something went wrong!",
                            timer: 4000
                        })
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            showCloseButton: true
                          })
                          fetchUserCart()
                          Toast.fire({
                            icon: "info",
                            title: 'Product removed from cart'
                          })
                    }
                })
                .catch(err => console.log(err))
            }
        })
    }

    const updateQuantity = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}/update-cart`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify({
                productId: productId,
                quantity: itemQuantity
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.err) {
                Swal.fire({
                    title: "Oops! :(",
                    icon: "error",
                    text: data.err
                })
            }
        })
        fetchUserCart()
    }
    
    useEffect(() => {
        if (itemQuantity > 1) {
            setDecreaseButton(false);
        } else if (itemQuantity >= 100) {
            setItemQuantity(1);
            console.log("TOO MUCH!")
        } else {
            setDecreaseButton(true);
            setItemQuantity(1);
        }
        updateQuantity()
    }, [itemQuantity, decreaseButton])
    
    
    useEffect(() => {
        fetchUserCart()
        setShow(true);
    }, [])

    return(
        <Fade in={show}>
        <Container>
         <hr></hr>
            <Row className="my-4 my-md-3 py-2 p-md-3">
                <Col md={6} className="my-2 my-md-auto text-center text-md-left"> <Link className="text-dark" to={`/products/${productId}`} ><h5>{brandName} {modelName}</h5></Link></Col>
                {/* <Col md={2} className="mb-2 my-md-auto"><Button size="sm" variant="secondary" className="btn-block" onClick={()=> removeFromCart()} >Remove</Button></Col> */}
                <Col md={2} className="mb-2 my-md-auto text-center"><Link as={Button} to="/my-cart" className="text-danger" onClick={()=> removeFromCart()} >Remove</Link></Col>
                <Col md={2} className="mb-2 m-md-auto">
                <InputGroup className="quantity m-auto">
                <InputGroup.Prepend>
                    <Button size="sm" variant="dark" className="themeColor" onClick={() => setItemQuantity(itemQuantity - 1)} disabled={decreaseButton}>-</Button>
                </InputGroup.Prepend>

                <FormControl appearance="none" className="text-center" type="number" value={itemQuantity} onChange={e => setItemQuantity(parseInt(e.target.value))} ></FormControl>

                <InputGroup.Append>
                    <Button size="sm" variant="dark" className="themeColor" onClick={() => setItemQuantity(itemQuantity + 1)}>+</Button>
                </InputGroup.Append>
                </InputGroup>
                </Col>
                <Col md={2} className="my-2 my-md-auto text-center" ><span className="d-md-none font-weight-bold">Subtotal: </span>&#8369;{(price * itemQuantity).toLocaleString()}.00</Col>
            </Row>
        </Container>
        </Fade>
    )
}