import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../context/authContext";
const { VITE_BACKEND_URL } = import.meta.env;

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedIn, setUser } = useAuthContext();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);

        // Set values in context and session storage
        sessionStorage.setItem("_tk", result.token);
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("user", JSON.stringify(result.user));

        setLoggedIn(true);
        setUser(result.user);

        navigate("/"); // Navigate after state updates
      } else {
        toast.info(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div class="my-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div class="my-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password" // Name must match the state property
                  placeholder="Password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info"
                  >
                    Register
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  );
};

export default Login;
