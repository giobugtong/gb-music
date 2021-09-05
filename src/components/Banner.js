import React, { useEffect, useState, useContext } from "react";
import { Button, Fade, Image, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import largeLogo from "../images/gb-music-logo-lg.png"
import UserContext from "../UserContext";
import Highlights from "./Highlights";


export default function Banner () {
    const [show, setShow] = useState(false)
    const { user } = useContext(UserContext)

    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <>
        <Fade in={show}>
            <Row className="bannerBG d-none d-md-flex justify-content-center align-items-center">
                <Col md={6} className="text-light text-center mdBannerText">
                    <Image fluid width="220px" className="mb-5" rounded src={largeLogo}/>
                    <h1 className="d-none">g.b. music</h1>
                    <h5 className="mb-4">Let your fingers do the talking.</h5>
                    <Button variant="secondary" as={ Link } to="/products" className="px-5 py-3">{user.isAdmin ? "Admin Dashboard" : "Shop now"}</Button>
                </Col>
            </Row>
        </Fade>

        <Fade in={show}>
            <Row className="smBannerBG d-xs-flex d-md-none justify-content-center align-items-center">
                <Col className="text-light text-center smBannerText mx-2">
                <Image fluid width="200px" className="mb-4" rounded src={largeLogo}/>
                    <h1 className="d-none">g.b. music</h1>
                    <h5 className="mb-4">Let your fingers do the talking.</h5>
                    <Button variant="light" as={ Link } to="/products" className="px-5 py-3 themeColor">{user.isAdmin ? "Admin Dashboard" : "Shop now"}</Button>
                </Col>
            </Row>
        </Fade>
        </>
    );
}