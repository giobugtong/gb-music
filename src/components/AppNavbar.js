import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, OverlayTrigger, Tooltip, Badge, Image } from "react-bootstrap";
import UserContext from "../UserContext";
import logo from "../images/gb-music-logo-sm.png"
/* import shoppingCart from "../icons/shopping-cart.svg";
import profileIcon from "../icons/profile-icon.svg";
import logoutIcon from "../icons/logout-icon.svg"; */

import shoppingCart from "../icons/white-shopping-cart.png";
import profileIcon from "../icons/white-profile.png";
import logoutIcon from "../icons/white-logout.png";

export default function AppNavbar () {
    const history = useHistory();
    const { user, unsetUser, userCart, fetchUserCart, cartCount } = useContext(UserContext);

    const logout = () => {
        unsetUser();
        fetchUserCart();
        window.location.replace("/login");
    }

    let rightNav = (user.email) ?
    (
        user.isAdmin ?
        (
            <>
                <Nav.Link className="mx-2 d-none d-md-inline icons" as={ NavLink } to="/profile">
                    <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip>
                        My Profile
                    </Tooltip>}>
                    <img width="24" src={profileIcon} alt="Profile icon" />
                    </OverlayTrigger>
                </Nav.Link>
                <Nav.Link className="d-md-none" as={ NavLink } to="/profile">My Profile</Nav.Link>
                <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip>
                        Logout
                    </Tooltip>}>
                    
                <Nav.Link className="mx-2 d-none d-md-inline icons" onClick={logout} to="/logout">
                <img width="25" alt="Logout icon" src={logoutIcon} />
                </Nav.Link>
                </OverlayTrigger>

                <Nav.Link className="d-md-none" onClick={logout} to="/logout">Logout</Nav.Link>
            </>
        ) :
        (  
        <>
                <OverlayTrigger key="bottom" placement="bottom" overlay={
                    <Tooltip>
                        My Cart
                    </Tooltip>}>
                <Nav.Link className="mx-1 d-none d-md-block icons" as={ NavLink } to="/my-cart">
                    <img width="24" alt="Shopping cart icon" src={shoppingCart}/>
                    <span style={{display: cartCount > 0 ? "inline-block" : "none"}}>
                    <Badge style={{marginLeft: "-3px"}} variant="light">{cartCount}</Badge>    
                    </span>
                </Nav.Link>
                    </OverlayTrigger>
                <Nav.Link className="d-md-none" as={ NavLink } to="/my-cart">
                My Cart
                <span style={{display: cartCount > 0 ? "inline-block" : "none"}}>
                    <Badge style={{marginLeft: "5px"}} variant="light">{cartCount}</Badge>    
                    </span>
                </Nav.Link>
                
                <Nav.Link className="mx-2 d-none d-md-inline icons" as={ NavLink } to="/profile">
                    <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip>
                        My Profile
                    </Tooltip>}>
                    <img width="24" src={profileIcon} alt="Profile icon" />
                    </OverlayTrigger>
                </Nav.Link>

                <Nav.Link className="d-md-none" as={ NavLink } to="/profile">My Profile</Nav.Link>
                
                <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip>
                        Logout
                    </Tooltip>}>
                    
                <Nav.Link className="mx-2 d-none d-md-inline icons" onClick={logout} to="/logout">
                <img width="25" alt="Logout icon" src={logoutIcon} />
                </Nav.Link>
                </OverlayTrigger>

                
                
                <Nav.Link className="d-md-none" onClick={logout} to="/logout">Logout</Nav.Link>
            </>
        )    
    ) :
    (
         <>
            <Nav.Link as={ NavLink } to="/register">Register</Nav.Link>
            <Nav.Link as={ NavLink } to="/login">Login</Nav.Link>
        </>
    )

    return(
        <Navbar id="navbar" variant="dark" expand="md">
            <Navbar.Brand as={ Link } to="/">
            <Image
                src={logo}
                width="35"
                height="35"
                className="ml-1 ml-md-3"
                alt="g.b. music logo"
            />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link as={ NavLink } to="/">Home</Nav.Link> */}
                    <NavDropdown href="/products" title="Products"  id="basic-nav-dropdown">
                        <NavDropdown.Item href="/products" className="font-weight-bold">ALL PRODUCTS</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.ItemText className="font-weight-bold">Fender</NavDropdown.ItemText>
                        <NavDropdown.Item href="">Acoustic</NavDropdown.Item>
                        <NavDropdown.Item href="">Electric</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.ItemText className="font-weight-bold">Marshall</NavDropdown.ItemText>
                        <NavDropdown.Item href="">Acoustic</NavDropdown.Item>
                        <NavDropdown.Item href="">Electric</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="font-weight-bold">Amplifiers</NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item href="" className="font-weight-bold">Accessories</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="ml-auto">
                    {/* {cartIcon} */}
                    {rightNav}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}