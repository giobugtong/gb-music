import React, { useContext, useEffect }from "react";
import UserContext from "../UserContext";
import Banner from "../components/Banner";
import Highlights from "../components/Highlights";

export default function Home () {
    const { fetchUserCart, changeDocTitle, cartCount } = useContext(UserContext);

    useEffect(() => {
        fetchUserCart();
    }, [])
    
    useEffect(() => {
        changeDocTitle(cartCount > 0 ? `G.B. Music (${cartCount})` : "G.B. Music")
    }, [cartCount])

    return(
        <>
            <Banner />
            {/* <Highlights /> */}
        </>
    );
}