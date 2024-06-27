import React, { useContext, useEffect, useState } from "react";
import "./signup.css";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../../context/AppContext";

function Signup() {
  const navigate = useNavigate();
  const { setShowSignup, showSignup, setShowLogin, setAuth, auth } =
    useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        formData
      );
      console.log(res);
      if (res.data.success) {
        setAuth({
          user: res.data.createdUser,
          token: res.data.token,
        });
        setShowSignup((e) => !e);
        setShowLogin(true);
      }
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleclick = () => {
    setShowSignup((e) => !e);
    setShowLogin((e) => !e);
  };

  return (
    <>
      {showSignup ? (
        <div className="modal">
          <div className="signupform">
            <div className="top">
              <h2>Sign up</h2>
              <div className="icon">
                <RxCross2 onClick={() => setShowSignup((e) => !e)} />
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
                type="text"
                placeholder="Email"
                name="email"
                onChange={handlechange}
                value={formData.email}
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
                Create Account
              </button>
            </form>
            Already have an account?{" "}
            <button className="btnlog" onClick={handleclick}>
              Log in
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Signup;
