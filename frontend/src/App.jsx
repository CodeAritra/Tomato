import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import { useContext, useState } from "react";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import CreateProduct from "./pages/admin/CreateProduct/CreateProduct";
import Orders from "./pages/admin/orders/Orders";
import Productlist from "./pages/admin/product list/Productlist";
import AppContext from "./context/AppContext";
import Cart from "./pages/cart/Cart";

function App() {
  const {showLogin,showSignup} =useContext(AppContext)
  
  return (
    <>
    
    {showLogin?<Login />:<></>}
    {showSignup?<Signup />:<></>}

      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/product-list" element={<Productlist />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
      
    </>
  );
}

export default App;
