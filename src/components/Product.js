import React, { useEffect, useState } from "react";
import { Card, Fade, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import defaultPhoto from "../images/default-product-photo.jpeg";
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


export default function Product ({productProp}) {
    const { _id, brandName, modelName, description, price, photo } = productProp;
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
    
    useEffect(() => {
        setShow(true)
    }, [])
    
    return(
        <Fade in={show}>
            <Link className="text-dark" style={{textDecoration: "none"}} to={`/products/${_id}`}>
                <Card className="cardHighlight">
                    <Card.Body>
                            <Card.Title className="mb-lg-4 text-center text-md-left">
                                <h3>{brandName}</h3>
                                {/* <Link className="text-dark" to={`/products/${_id}`}> */}
                                <h5>{modelName}</h5>
                                {/* </Link> */}
                            </Card.Title>
                                <Image src={productPhoto(photo)} width="400" rounded className="mt-2 mb-3 mb-md-4 mx-auto d-block" fluid />
                        
                    </Card.Body>
                        <Card.Text className="mx-3">
                            {description}
                            <p className="mt-2">
                            <strong>&#8369;{price.toLocaleString()+".00"}</strong>
                            </p>
                        </Card.Text>
                    {/* <Card.Footer>
                        <Link className="text-dark" to={`/products/${_id}`}>See more details</Link>
                    </Card.Footer> */}
                </Card>
            </Link>
        </Fade>
    );
}