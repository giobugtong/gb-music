import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Row, Col, Fade } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import Order from "../components/Order"
import MyOrders from "../components/MyOrders";

export default function MyProfile () {
    const { user, changeDocTitle, cartCount } = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [joinDate, setJoinDate] = useState("");
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false)

    const fetchProfile = () => {
        fetch((`${process.env.REACT_APP_API_URL}/users/profile`), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    title: "Oops!",
                    text: "An error has occured",
                    icon: "error",
                    timer: 4000
                })
            } else {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setJoinDate(data.joinDate.slice(0, 10));
                setOrders(data.orders);
            }
        })
    }

    useEffect(() => {
        fetchProfile();
        setShow(true)
    }, []);

    useEffect(() => {
        changeDocTitle(cartCount > 0 ? `My Profile (${cartCount})` : `My Profile`)
    }, [cartCount])

    return (
        <Fade in={show}>
        <Container className="my-3 my-md-5">
            <h2>My Profile</h2>
            <Row>
                <Col xs={12}>
                    <Card className="mt-3 mt-md-4">
                        <Card.Header><h3>{firstName} {lastName}</h3></Card.Header>
                        <Card.Body>
                            <p>Email address: {user.email}</p>
                            <p>Join date: {joinDate}</p>
                        </Card.Body>
                            <Card.Footer style={{display: user.isAdmin ? "block" : "none"}} className="text-right text-lg-left">
                                <Link className="text-info" to="/products">Go to Admin Dashboard</Link>
                            </Card.Footer>
                    </Card>
                </Col>
                <Col xs={12}>
                    <Card className="mt-3 mt-md-4 border-0">
                         <h4 className="mt-3 mt-md-4">My Orders ({orders.length})</h4>
                        <hr></hr>
                        {/* <Card.Body> */}
                            <MyOrders props={orders}/>
                        {/* </Card.Body> */}
                    </Card>
                </Col>
            </Row>
        </Container>
        </Fade>
    )
}