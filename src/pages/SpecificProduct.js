import React, {useState, useEffect, useContext } from "react";
import { Container, Card, Button, InputGroup, FormControl, Fade, Image, Col, Row } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
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

export default function SpecificProduct () {

    const [brandName, setBrandName] = useState("");
    const [modelName, setModelName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [photo, setPhoto] = useState("");
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [type, setType] = useState("");
    const [category, setCategory] = useState("");
    const [weight, setWeight] = useState(null);

    const [decreaseButton, setDecreaseButton] = useState(true);
    const { productId } = useParams();
    const { user, setUser, fetchUserCart, cartCount, changeDocTitle } = useContext(UserContext);
    const history = useHistory();
    const [show, setShow] = useState(false)

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

    const setPreviousProduct = () => {
        localStorage.setItem("previousProduct",`/products/${productId}`);
        setUser({previousProduct: `/products/${productId}`});
    }

    const addToCart = (productId) => {
        
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/add-to-cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`
            },
            body: JSON.stringify({
                itemQuantity: quantity
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                Swal.fire({
                    title: `Item/s added to cart!`,
                    icon: "success",
                    text: "Where to next?",
                    showDenyButton: true,
                    confirmButtonText: "Keep shopping",
                    denyButtonText: "Checkout",
                    showCancelButton: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        history.push("/products");
                    } else if (result.isDenied) {
                        history.push("/my-cart")
                    }
                })
                fetchUserCart()                
            } else {
                Swal.fire({
                    title: `Something went wrong! :(`,
                    icon: "error",
                    text: "Please try again.",
                    timer: 4000
                })
            }
        })
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        if (quantity > 1) {
            setDecreaseButton(false);
        } else {
            setDecreaseButton(true);
            setQuantity(1);
        }
    }, [quantity, decreaseButton])
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (!data || data.err) {
                Swal.fire({
                    title: `Oops!`,
                    icon: "error",
                    text: "Product does not exist.",
                    confirmButtonText: "Go to Products"
                })
                .then(result => {
                    if (result.isConfirmed) {
                        history.push("/products")
                    } else {
                        history.push("/")
                    }
                })
            } else {
                setBrandName(data.brandName);
                setModelName(data.modelName);
                setDescription(data.description);
                setPrice(data.price);
                setPhoto(data.photo);
                setMaterial(data.material);
                setColor(data.color);
                setSize(data.size);
                setType(data.type);
                setCategory(data.category);
                setWeight(data.weight);
            }
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: err
            })
        })
        setShow(true);
    }, [])
    
    useEffect(() => {
        changeDocTitle(cartCount > 0 ? `${brandName} ${modelName} (${cartCount})` : `${brandName} ${modelName}`)
    }, [cartCount, brandName, modelName])

    return(
        <Fade in={show}>
        <Container>
            <Card className="my-3">
                <h4 className="p-3 p-md-4 text-dark text-center">{brandName} {modelName}</h4>
                <Card.Body>
                    <Image className="d-block mx-auto mb-4" src={productPhoto(photo)} fluid width="460px"/>
                    <Row>
                        <Col sm={12}>{description}</Col>
                    </Row>
                    <hr></hr>
                    <p className="mt-3">Product Specifications: </p>
                    <Row className="text-left my-3 my-sm-4">
                        <Col sm={4}>
                            <div className="">Type: {type}</div>
                            <div className="">Category: {category}</div>
                        </Col>

                        <Col sm={4}>
                            <div className="">Material: {material}</div>
                            <div className="">Color: {color}</div>
                        </Col>

                        <Col sm={4}>

                            <div className="">Size: {size}</div>
                            <div className="">Weight: {weight}g</div>
                        </Col>
                    </Row>
                    <hr></hr>
                    <h6>Price: &#8369;{price.toLocaleString()}.00</h6>
                    {
                    (user.accessToken) && 
                    <InputGroup className="quantity mx-auto mx-md-0 mt-4">
                        <InputGroup.Prepend>
                            <Button onClick={() => setQuantity(quantity - 1)} disabled={decreaseButton} variant="warning">-</Button>
                        </InputGroup.Prepend>

                        <FormControl appearance="none" className="text-center" type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} ></FormControl>

                        <InputGroup.Append>
                            <Button onClick={() => setQuantity(quantity + 1)} variant="warning">+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    
                    }
                </Card.Body>
                <Card.Footer className="d-md-flex justify-content-between">

                {
                    user.accessToken ? <Link to={`/products/${productId}`} className="d-block px-5 my-3 btn btn-sm-block themeColor" onClick={() => addToCart(productId)} >Add to cart</Link>
                    : <Button as={ Link } onClick={setPreviousProduct} to="/login" className="d-block px-3 my-3 d-md-inline btn-warning">Login to purchase</Button>
                }
                    
                    <Link to="/products" className="text-center d-block my-3 d-md-inline text-dark">Back to Product Catalog</Link>
                </Card.Footer>
            </Card>
        </Container>
        </Fade>
    )
}