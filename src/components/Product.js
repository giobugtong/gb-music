import React, { useEffect, useState } from "react";
import { Card, Fade, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import defaultPhoto from "../images/default-product-photo.jpeg"

export default function Product ({productProp}) {
    const { _id, brandName, modelName, description, price, photo } = productProp;
    const [show, setShow] = useState(false)

    
    useEffect(() => {
        setShow(true)
    }, [])
    
    return(
        <Fade in={show}>
        <Card className="cardHighlight m-2">
            <Card.Body>
                    <Card.Title className="mb-lg-4 text-center text-md-left">
                        <h3>{brandName}</h3>
                        <Link className="text-dark" to={`/products/${_id}`}>
                        <h5>{modelName}</h5>
                        </Link>
                    </Card.Title>
                    <Link to={`/products/${_id}`}>
                        <Image src={defaultPhoto}width="400" rounded className="mt-2 mb-3 mb-md-4 mx-auto d-block" fluid />
                    </Link>
                
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Text>
                    <p className="my-0">
                       <strong>&#8369;{price.toLocaleString()+".00"}</strong>
                    </p>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Link className="text-dark" to={`/products/${_id}`}>See more details</Link>
            </Card.Footer>
        </Card>
        </Fade>
    );
}