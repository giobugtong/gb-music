import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Button, InputGroup, FormControl, Container, Fade, Image } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import defaultPhoto from "../images/default-product-photo.jpeg"
import sheeran from "../images/sheeran.jpg";
import squier from "../images/squier.jpg";
import malibu from "../images/malibu.jpg";
import js328q from "../images/js328q.jpg";
import clapton from "../images/clapton.jpg";
import reverb from "../images/reverb.jpg";
import as100d from "../images/as100d.jpg";
import th30c from "../images/th30c.jpg";
import telecaster from "../images/telecaster.jpg";
import cd60ce from "../images/cd60ce.jpg";
import camouflage from "../images/camouflage.jpg";
import meshuggah from "../images/meshuggah.jpg";
import capo from "../images/capo.jpg";
import tweed from "../images/tweed.jpg";
import beatles from "../images/beatles.jpg";

export default function CartContents (props) {
    const { cartItemProp } = props;
    const { productId, brandName, modelName, quantity, price, photo } = cartItemProp;
    const { user, userCart, setUserCart, fetchUserCart } = useContext(UserContext);
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const [decreaseButton, setDecreaseButton] = useState(true);
    const [show, setShow] = useState(false);

    const productPhoto = (photo) => {
        switch (photo) {
            case "sheeran": return sheeran;
            case "squier": return squier;
            case "malibu": return malibu;
            case "js328q": return js328q;
            case "clapton": return clapton;
            case "reverb": return reverb;
            case "as100d": return as100d;
            case "th30c": return th30c;
            case "telecaster": return telecaster;
            case "cd60ce": return cd60ce;
            case "camouflage": return camouflage;
            case "meshuggah": return meshuggah;
            case "capo": return capo;
            case "tweed": return tweed;
            case "beatles": return beatles;
            default: return defaultPhoto;
        }
    }

    const removeFromCart = (id) => {
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
                        productId: id
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
                        fetchUserCart()
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            showCloseButton: true
                          })
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
            fetchUserCart()
            if (data.err) {
                Swal.fire({
                    title: "Oops! :(",
                    icon: "error",
                    text: data.err
                })
            }
        })
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
        setShow(true);
    }, [])

    return(
        <Fade in={show}>
        <Container>
         <hr></hr>
            <Row className="my-4 my-md-3 py-2 p-md-3">
                <Col md={2} className="my-2 my-md-auto text-center text-md-left"> <Image src={productPhoto(photo)} fluid width="80px"/></Col>
                <Col md={4} className="my-2 my-md-auto text-center text-md-left"> <Link className="text-dark" to={`/products/${productId}`} ><h5>{brandName} {modelName}</h5></Link></Col>
                <Col md={2} className="mb-2 my-md-auto text-center"><Link to="/my-cart" className="text-info" onClick={() => removeFromCart(productId)} >Remove</Link></Col>
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