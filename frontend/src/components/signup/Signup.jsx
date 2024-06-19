import React, { useEffect, useState } from "react";
import "./signup.css";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ setShowSignup, showSignup,setShowLogin }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
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
      const { data } = await axios.post(
        "http://localhost:5000/auth/signup",
        formData
      );
      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleclick = ()=>{
    setShowSignup((e) => !e)
    setShowLogin((e)=>!e)
  }

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
                className="inputsign"
                type="text"
                placeholder="Username"
                name="username"
                onChange={handlechange}
                value={formData.username}
              />
              <input
                className="inputsign"
                type="text"
                placeholder="Email"
                name="email"
                onChange={handlechange}
                value={formData.email}
              />

              <input
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
            <button className="btnlog" onClick={handleclick}>Log in</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Signup;
