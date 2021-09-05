import React, {useContext, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import UserContext from "../UserContext";
import UserView from "../components/UserView";


export default function FilteredProducts () {
    const { filter } = useParams();
    const { user, changeDocTitle, cartCount } = useContext(UserContext);
    const [allProducts, setAllProducts] = useState([]);

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/filtered/${filter}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
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
         <UserView productData={allProducts}/>
        </>
    )
}