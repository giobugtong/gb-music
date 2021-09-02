import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Swal from 'sweetalert2';

import AppNavbar from './components/AppNavbar';
import UserContext from './UserContext';

import ProductCatalog from "./pages/ProductCatalog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import SpecificProuct from './pages/SpecificProduct';
import MyProfile from './pages/MyProfile';
import MyCart from './pages/MyCart';

export default function App() {
  
  const [user, setUser] = useState({
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
    accessToken: localStorage.getItem("accessToken"),
    isAdmin: localStorage.getItem("isAdmin") === "true",
    previousProduct: localStorage.getItem("previousProduct"),
    userCart: localStorage.getItem("userCart")
  });

  const [userCart, setUserCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const unsetUser = () => {
    localStorage.clear();
    setUser({
      id: null,
      email: null,
      accessToken: null,
      isAdmin: null,
      previousProduct: "/",
      userCart: null
    });
  }

  const fetchUserCart = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}/my-cart`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setUserCart(data);
        console.log("userCart FETCHED with " + data.length + " item/s")
    })
    .catch(err => {
        Swal.fire({
            title: "Oops!",
            icon: "error",
            text: err
        })
    })
    setCartCount(userCart.length)
  }
  
  useEffect(() => {
    fetchUserCart()
}, [])

  return(
    <Fragment>
      <UserContext.Provider value={{ user, setUser, unsetUser, userCart, fetchUserCart }}>
        <Router>
        <AppNavbar />
          <Container fluid>
            <Switch>

              <Route exact path="/" component={ Home } />
              <Route exact path="/products" component={ ProductCatalog } />

              <Route exact path="/profile">
                {!user.email ? <Redirect to="/login" /> : <MyProfile />}
              </Route>

              <Route exact path="/my-cart">
                {!user.email || user.isAdmin ? <Redirect to="/login" /> : <MyCart />}
              </Route>

              <Route exact path="/login">
                {user.email ? <Redirect to="/" /> : <Login/>}
              </Route>

              <Route exact path="/register">
               {user.email ? <Redirect to="/" /> : <Register/>}
              </Route>

              <Route exact path="/products/:productId">
                {user.isAdmin ? <Redirect to="/products" /> : <SpecificProuct />}
              </Route>
              <Route component={ NotFound } />
              
            </Switch>
          </Container>
        </Router>
      </UserContext.Provider>
    </Fragment>
  )
}


