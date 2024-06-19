import React from "react";
import "./Navbar.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

function Navbar({ setShowLogin, setShowSignup }) {
  return (
    <div className="navbar">
      <div className="logo">Tomato</div>
      <div className="searchbar">
        <input className="inputnav" type="text" placeholder="Search a dish" />
        <div className="icon">
          <CiSearch />
        </div>
      </div>
      <div className="btn">
        <Link to="/myorders" className="buttonnav">
          My Orders
        </Link>
        <button className="buttonnav" onClick={() => setShowLogin((e)=>!e)}>
          Log in
        </button>
        <button className="buttonnav" onClick={() => setShowSignup((e)=>!e)}>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
