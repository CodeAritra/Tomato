import React, { useEffect, useState } from "react";
import "../signup/signup.css";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setShowLogin, showLogin ,setShowSignup}) {
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

      const { data } = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );
      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleclick = ()=>{
    setShowLogin((e)=>!e)
    setShowSignup((e) => !e)
  }
  return (
    <>
      {showLogin ? (
        <div className="modal">
          <div className="signupform">
            <div className="top">
              <h2 >Login</h2>
              <div className="icon">
                <RxCross2 onClick={() => setShowLogin((e) => !e)} />
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
            <button className="btnlog" onClick={handleclick}>Create here</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Login;
