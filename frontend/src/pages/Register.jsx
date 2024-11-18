import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../context/authContext"
const { VITE_BACKEND_URL } = import.meta.env;

const Register = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useAuthContext();
  const [data, setData] = useState({
    name: "",
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
    console.log(data)
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        setLoggedIn(true);
        // SetUser(result.user);
        console.log(result)
        sessionStorage.setItem("user", JSON.stringify(result.user));
        sessionStorage.setItem("_tk", result.token);
        navigate("/");
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
        <h1 className="text-center">Register</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div class="form my-3">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="Name"
                  value={data.name}
                  name="name"
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                />
              </div>
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
                  already Here?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info"
                  >
                    Login
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-dark" type="submit">
                  register
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

export default Register;
