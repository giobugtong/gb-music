import React, { useContext, useEffect }from "react";
import UserContext from "../UserContext";
import Banner from "../components/Banner";
import Highlights from "../components/Highlights";

export default function Home () {
    const { fetchUserCart } = useContext(UserContext);

    useEffect(() => {
        fetchUserCart()
    }, [])

    return(
        <>
            <Banner />
            <Highlights />
        </>
    );
}