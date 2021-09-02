import React, { useEffect} from "react";
import { Card, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import defaultPhoto from "../images/default-product-photo.jpeg"

export default function Product ({productProp}) {
    const { _id, brandName, modelName, description, price, photo } = productProp;
    
    /* useEffect(() => {
    }, []) */
    
    return(
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
                       <strong>P{price.toLocaleString()+".00"}</strong>
                    </p>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Link className="text-dark" to={`/products/${_id}`}>See more details</Link>
            </Card.Footer>
        </Card>
    );
}

Product.propTypes = {
    //shape() used to check that a prop object conforms to a specific shape
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}