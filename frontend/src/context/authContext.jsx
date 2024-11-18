import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";

const AuthContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {},
  decodedToken: {},
  user: null,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  // State initialization
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return sessionStorage.getItem("loggedIn") === "true";
  });
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const token = sessionStorage.getItem("_tk");
  const { decodedToken, isExpired } = useJwt(token || "");

 
  useEffect(() => {
    if (token && decodedToken && !isExpired) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token, decodedToken, isExpired]);

  // Update session storage on changes
  useEffect(() => {
    sessionStorage.setItem("loggedIn", isLoggedIn.toString());
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [isLoggedIn, user]);

  const values = Object.seal({
    isLoggedIn,
    setLoggedIn,
    decodedToken,
    user,
    setUser,
  });

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
