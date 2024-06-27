import React, { useContext, useEffect, useState } from "react";
import "../signup/signup.css";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../context/AppContext.js";

function Login() {
  const { setShowLogin, showLogin, setShowSignup, setAuth } =
    useContext(AppContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handlechange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );
      console.log(res.data);
      if (res.data.success) {
        setShowLogin((e) => !e);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        const parsed = JSON.stringify(res.data);
        localStorage.setItem("token", parsed);
        navigate("/");
      }
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleclick = () => {
    setShowLogin((e) => !e);
    setShowSignup((e) => !e);
  };
  return (
    <>
      {showLogin ? (
        <div className="modal">
          <div className="signupform">
            <div className="top">
              <h2>Login</h2>
              <div className="icon">
                <RxCross2 onClick={() => setShowLogin((e) => !e)} />
              </div>
            </div>
            <form onSubmit={handlesubmit}>
              <input
                required
                className="inputsign"
                type="text"
                placeholder="Username"
                name="username"
                onChange={handlechange}
                value={formData.username}
              />
              <input
                required
                className="inputsign"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handlechange}
                value={formData.password}
              />
              <button className="btnsign" type="submit">
                Log in
              </button>
            </form>
            Don't have an account?{" "}
            <button className="btnlog" onClick={handleclick}>
              Create here
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Login;
