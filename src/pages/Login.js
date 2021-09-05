import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2"
import UserContext from "../UserContext";

export default function Login () {
    const { user, setUser, fetchUserCart, changeDocTitle } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loginButton, setLoginButton] = useState(false);
    const [errorStyle, setErrorStyle] = useState("");
    const history = useHistory();

    
    const loginUser = e => {
        e.preventDefault();
        fetchUserCart();
        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.accessToken) {
                localStorage.setItem("id", data.foundUser._id);
                localStorage.setItem("firstName", data.foundUser.firstName);
                localStorage.setItem("email", email);
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("isAdmin", data.foundUser.isAdmin);
                localStorage.setItem("userCart", JSON.stringify(data.foundUser.userCart));
                setUser({
                    email: email,
                    id: data.foundUser._id,
                    firstName: data.foundUser.firstName,
                    accessToken: data.accessToken,
                    previousProduct: localStorage.previousProduct,
                    isAdmin: data.foundUser.isAdmin,
                    userCart: data.foundUser.userCart
                });
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        showCloseButton: true,
                        timer: 2600,
                        timerProgressBar: true,
                        showCloseButton: true
                    })
                    
                    Toast.fire({
                        icon: 'success',
                        title: 'You are now logged in'
                    })
                    
                    
                    setErrorStyle("");
                    
                    if(data.foundUser.isAdmin) {
                        history.push("/products");
                    } else {
                        user.previousProduct ? history.push(user.previousProduct) :
                        history.push("/")
                    }
                } else if (data.incorrectPassword) {
                    if (errorMsg === `Incorrect password. Please try again.`) {
                        setErrorMsg(`Incorrect password. Please check your spelling.`);
                        setErrorStyle("border-danger");
                    } else {
                        setErrorMsg("Incorrect password. Please try again.");
                        setErrorStyle("border-danger");
                    }
                } else if (data.unregisteredUser) {
                    setErrorMsg("Unregistered user or incorrect email. Please try again.");
                }
            })
        }
        
        useEffect(() => {
            if(email && password) {
                setLoginButton(true);
            } else {
                setLoginButton(false);
            }
        }, [email, password]);

        useEffect(() => {
            changeDocTitle("G.B. Music: Login")
        }, [])

        return(
            <Row className="mt-3 mt-md-5 mb-4">
            <Col xs={11} sm={9} md={6} lg={4} xl={3} className="mx-auto">
                <h1 className="mb-4">Login</h1>
                <Form onSubmit={e => loginUser(e)}>
                        <div className="text-danger">{errorMsg}</div>
                        
                    <Form.Group className="mt-4 mb-4">
                        <Form.Control type="email" placeholder="Email address" required value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="my-4">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control variant="danger" type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className={errorStyle}/>
                    </Form.Group>
                    {loginButton ? 
                        <Button variant="light" type="submit" className="mt-5 btn-block themeColor" >Login</Button> :
                        <Button variant="secondary" type="submit" className="mt-5 btn-block" disabled>Login</Button>
                    }
                </Form>
                <p className="text-center mt-5">Not a member yet? <Link className="text-info" to="/register">Register now, it's free!</Link></p>
            </Col>
        </Row>
    )
}