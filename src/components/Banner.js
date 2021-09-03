import React, { useEffect, useState } from "react";
import { Button, Fade, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import largeLogo from "../images/gb-music-logo-lg.png"


export default function Banner () {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <>
        <Fade in={show}>
            <div className="bannerBG d-none d-md-block">
                <div className="text-light text-center mdBannerText">
                    <Image fluid width="220px" className="mb-4" rounded src={largeLogo}/>
                    <h1 className="d-none">g.b. music</h1>
                    <h5 className="mb-4">Let your fingers do the talking.</h5>
                    <Button variant="light" as={ Link } to="/products" className="px-5 py-3 themeColor">Shop now</Button>
                </div>
            </div>
        </Fade>

        <Fade in={show}>
            <div className="smBannerBG d-xs-block d-md-none">
                <div className="text-light text-center smBannerText mx-2">
                <Image fluid width="200px" className="mb-4" rounded src={largeLogo}/>
                    <h1 className="d-none">g.b. music</h1>
                    <h5 className="mb-4">Let your fingers do the talking.</h5>
                    <Button variant="light" as={ Link } to="/products" className="px-5 py-3 themeColor">Shop now</Button>
                </div>
            </div>
        </Fade>
        </>
    );
}