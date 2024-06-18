import React from "react";
import "./Navbar.css";
import { CiSearch } from "react-icons/ci";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">Tomato</div>
      <div className="searchbar">
        <input className="inputnav" type="text" placeholder="Search a dish" />
        <div className='icon'><CiSearch /></div>
      </div>
      <div className="btn">
        <button className="buttonnav">My Orders</button>
        <button className="buttonnav">Log in</button>
        <button className="buttonnav">Sign up</button>
      </div>
    </div>
  );
}

export default Navbar;
