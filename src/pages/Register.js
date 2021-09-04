import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2"
import UserContext from "../UserContext";

export default function Register () {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [warningMsg, setWarningMsg] = useState("");
    const [showLoginLink, setShowLoginLink] = useState("d-none");
    const [mismatchedPassword, setMismatchedPassword] = useState("");
    const [alreadyRegistered, setAlreadyRegistered] = useState("");
    const [registerButton, setRegisterButton] = useState(false);
    const { changeDocTitle } = useContext(UserContext);
    const history = useHistory();

    useEffect(()=>{
        if(firstName && lastName && email && password && confirmPassword && password === confirmPassword) {
            setRegisterButton(true);
            setMismatchedPassword("");
            setWarningMsg("");
        } else if (password && confirmPassword && password !== confirmPassword) {
            setWarningMsg("Passwords do not match!");
            setMismatchedPassword("border-danger");
            setRegisterButton(false);
        } else {
            setRegisterButton(false);
            setMismatchedPassword("");
            setWarningMsg("");
        }
    }, [firstName, lastName, email, password, confirmPassword, registerButton]);

    const registerUser = e => {
        e.preventDefault();
        
        fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.emailExists) {
                setAlreadyRegistered("border-danger");
                setShowLoginLink("text-danger");
            } else if (data.incompleteFields) {
                setWarningMsg("Please enter all required fields");
            } else {
                console.log(data);
                Swal.fire({
                    title: "You are now registered!",
                    icon: "success",
                    text: `Thank you for registering, ${data.firstName} ${data.lastName}!`,
                    timer: 5000
                })
                resetForm();
                history.push("/login");
            }
        })
    }

    const resetForm = () => {
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        setMismatchedPassword("");
        setShowLoginLink("d-none");
        setAlreadyRegistered("");
    }

    useEffect(() => {
        changeDocTitle("G.B. Music: Register")
    })
    
    return(
        <Row className="mt-3 mt-md-5 pb-5">
            <Col xs={11} sm={9} md={6} lg={4} xl={3} className="mx-auto">
                <h1>Register</h1>
                <Form onSubmit={e => registerUser(e)}>
                    <p className="text-danger">{warningMsg}</p>
                    <p className={showLoginLink}>Email is already registered. Please <Link className="text-info" to="/login" >login</Link> or enter a different email.</p>
                    
                    <Form.Group className="my-4">
                        <Form.Label>First Name: </Form.Label>
                        <Form.Control type="text" placeholder="First name" required value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="my-4">
                        <Form.Label>Last Name: </Form.Label>
                        <Form.Control type="text" placeholder="Last name" required value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="my-4">
                        <Form.Label>Email Address: </Form.Label>
                        <Form.Control className={alreadyRegistered} type="email" placeholder="Email address" required value={email} onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="my-4">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control className={mismatchedPassword} type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="my-4">
                        <Form.Label>Confirm Password: </Form.Label>
                        <Form.Control className={mismatchedPassword} type="password" placeholder="Enter password again" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                    {registerButton ? 
                        <Button variant="info" type="submit" className="mt-5 btn-block themeColor" >Register</Button> :
                        <Button variant="secondary" type="submit" className="mt-5 btn-block" disabled>Register</Button>
                    }
                    <Button variant="warning" className="mt-4 btn-block" onClick={resetForm}>Reset</Button>
                </Form>
            </Col>
        </Row>
    )
}