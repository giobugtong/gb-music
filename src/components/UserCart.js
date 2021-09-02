import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import CartContents from "./CartContents";


export default function UserCart ({userCart}) {
    const { user, fetchUserCart } = useContext(UserContext);
    const [cartContents, setCartContents] = useState([]);

    useEffect(() => {
        if (userCart.length > 0) {
            const userCartContents = userCart.map(item => {
                return (
                    <CartContents key={item._id} cartItemProp={item} />
                );
            });
            setCartContents(userCartContents);
        }
    }, [user])


    return(
        <>
            {cartContents}
        </>
    )
}