import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function Banner () {
    return (
        <>
        <div className="bannerBG d-none d-md-block">
            <div className="text-light text-center mdBannerText">
                <h1>Concert Instruments</h1>
                <h5 className="mb-4">Let your imagination run wild.</h5>
                <Button variant="light" as={ Link } to="/products" className="px-5 py-3 themeColor">Shop now</Button>
            </div>
        </div>
        <div className="smBannerBG d-xs-block d-md-none">
            <div className="text-light text-center smBannerText mx-2">
                <h1>Concert Instruments</h1>
                <h5 className="mb-4">Let your imagination run wild.</h5>
                <Button variant="light" as={ Link } to="/products" className="px-5 py-3 themeColor">Shop now</Button>
            </div>
        </div>
        </>
    );
}