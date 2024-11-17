import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    

    let token = sessionStorage.getItem("_tk");
    const { decodedToken, isExpired } = useJwt(token || "");

    const [isLoggedIn, setLoggedIn] = useState(() => {
        const storedLoggedIn = sessionStorage.getItem("loggedIn");
        return storedLoggedIn === "true";
    });

    useEffect(() => {
        token = sessionStorage.getItem("_tk");
        sessionStorage.setItem("loggedIn", isLoggedIn);
        storedUserString = sessionStorage.getItem('user');
        
        if (decodedToken) {
            setLoggedIn(true);
        }
        if (isExpired) {
            setLoggedIn(false);
        }
    }, [token, isLoggedIn]);

    const contextValue = {
        url,
        token,
        isLoggedIn,
        setLoggedIn,
        decodedToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;