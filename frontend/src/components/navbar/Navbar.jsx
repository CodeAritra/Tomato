import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { CiSearch } from "react-icons/ci";
import { BsCart } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import {  toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.js";
import { useRef } from "react";

function Navbar() {
  const { setShowLogin, setShowSignup, auth, setAuth } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate()

  const handlelogout = () => {
    localStorage.removeItem("token");
    setAuth({ ...auth, user: "", token: "" });
    // setIsLoggedin(false)
    // console.log("Logout");
    toast.success("Logout Successfully")
    navigate("/")
  };

  const handleToggle = () => {
    console.log("Clicked");
    setIsOpen((e) => !e);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };



  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="logo">Book Store</div>
      <div className="searchbar">
        <input className="inputnav" type="text" placeholder="Search a book" />
        <div className="icon">
          <CiSearch />
        </div>
      </div>
      <div className="btn-nav">
        {auth.user ? (
          <>
            <Link to="/" className="icon link">Home</Link>
            <Link to="/cart" className="icon link" >
              <BsCart />
            </Link>
            <div className="dropdown" ref={dropdownRef}>
              <button className="dropdown-toggle" onClick={handleToggle}>
                {auth.user.username}
                <IoMdArrowDropdown className="navicon" />
              </button>
              {isOpen && (
                <div className="dropdown-menu">
                  {auth.user.role === 1 ? (
                    <>
                      <Link to="/dashboard" className="dropdown-item">
                        Dashboard
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/myorder" className="dropdown-item">
                        My Orders
                      </Link>
                    </>
                  )}
                  <p className="dropdown-item" onClick={handlelogout}>
                    Log out
                  </p>
                
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              className="buttonnav"
              onClick={() => setShowLogin((e) => !e)}
            >
              Log in
            </button>
            <button
              className="buttonnav"
              onClick={() => setShowSignup((e) => !e)}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
