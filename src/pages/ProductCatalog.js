import React, { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

export default function ProductCatalog () {
    const { user, changeDocTitle, cartCount } = useContext(UserContext);
    const [allProducts, setAllProducts] = useState([]);

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/`)
        .then(res => res.json())
        .then(data => {
            setAllProducts(data);
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    useEffect(() => {
        if (user.isAdmin) {
            changeDocTitle("Admin Dashboard")
        } else {
            changeDocTitle(
                cartCount > 0 ? `G.B. Music: Products (${cartCount})`
                : "G.B. Music: Products"
            )
        }

    }, [cartCount, user])

    return(
        <>
            { user.isAdmin ? <AdminView fetchData={fetchData} productData={allProducts} /> : <UserView productData={allProducts} /> }
        </>
    )

}