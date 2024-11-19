import { createContext, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
const { VITE_BACKEND_URL } = import.meta.env;

const AuthContext = createContext({
  isLoggedIn: false,
  setLoggedIn: () => {},
  decodedToken: {},
  user: null,
  setUser: () => {},
  token: {},
  store: [],
  setStore: () => {}
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
  const [store, setStore] = useState([]);  // Corrected this line

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

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_URL}/api/product/list`, {
          method: "GET",
        });
        const res = await response.json();

        if (res.success) {
          setStore(res.data);
        } else {
          toast.error("Failed to fetch the product list.");
        }
      } catch (error) {
        console.error("Error fetching the list:", error);
      }
    };

    fetchList();
  }, []);

  const values = Object.seal({
    isLoggedIn,
    setLoggedIn,
    decodedToken,
    user,
    setUser,
    token,
    store,
    setStore
  });

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
