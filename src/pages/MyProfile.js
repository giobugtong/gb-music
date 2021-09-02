import React, { useContext, useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useHistory, useParams } from "react-router-dom";
import UserContext from "../UserContext";

export default function MyProfile () {
    const { user } = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [joinDate, setJoinDate] = useState("");
    const [orders, setOrders] = useState([]);

    const fetchProfile = async () => {
        await fetch((`${process.env.REACT_APP_API_URL}/users/profile`), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
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
        fetchProfile()
    }, []);

    let adminDashboard = user.isAdmin ? 
    (
        <>
        <Card.Footer className="text-right text-lg-left">
            <Link className="text-info" to="/products">Go to Admin Dashboard</Link>
        </Card.Footer>
        </>
    ) : 
    (
        null
    )

    return (
        <Container className="my-3 my-md-5">
            <h2>My Profile</h2>
            <Card className="mt-3 mt-md-4">
                <Card.Header><h3>{firstName} {lastName}</h3></Card.Header>
                <Card.Body>
                    <p>Email address: {user.email}</p>
                    <p>Join date: {joinDate}</p>
                </Card.Body>
                    {adminDashboard}
            </Card>
        </Container>
    )
}