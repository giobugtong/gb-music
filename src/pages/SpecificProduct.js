import React, {useState, useEffect, useContext } from "react";
import { Container, Card, Button, InputGroup, FormControl } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function SpecificProduct () {

    const [brandName, setBrandName] = useState("");
    const [modelName, setModelName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [decreaseButton, setDecreaseButton] = useState(true);
    const { productId } = useParams();
    const { user, setUser, fetchUserCart, userCart } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => {
            setBrandName(data.brandName);
            setModelName(data.modelName);
            setDescription(data.description);
            setPrice(data.price);
        })
    })

    const setPreviousProduct = () => {
        localStorage.setItem("previousProduct",`/products/${productId}`);
        setUser({previousProduct: `/products/${productId}`});
    }

    useEffect(() => {
        if (quantity > 1) {
            setDecreaseButton(false);
        } else {
            setDecreaseButton(true);
            setQuantity(1);
        }
    }, [quantity, decreaseButton])
    
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

    return(
        <Container>
            <Card className="my-5">
                <h4 className="p-3 p-md-4 text-dark text-center">{brandName} {modelName}</h4>
                <Card.Body>
                    <Card.Text>{description}</Card.Text>
                    <h6>Price: P{price.toLocaleString()}.00</h6>
                    {
                    (user.accessToken) ? 
                    <InputGroup className="quantity mx-auto mx-md-0 mt-4">
                        <InputGroup.Prepend>
                            <Button onClick={() => setQuantity(quantity - 1)} disabled={decreaseButton} variant="warning">-</Button>
                        </InputGroup.Prepend>

                        <FormControl appearance="none" className="text-center" type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value))} ></FormControl>

                        <InputGroup.Append>
                            <Button onClick={() => setQuantity(quantity + 1)} variant="warning">+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    : null
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
    )
}