import React, { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";
import Swal from "sweetalert2";

export default function ProductCatalog () {
    const { user } = useContext(UserContext);
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

    return(
        <>
            { user.isAdmin ? <AdminView fetchData={fetchData} productData={allProducts} /> : <UserView productData={allProducts} /> }
        </>
    )

}