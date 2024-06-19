import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import { useState } from "react";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import CreateProduct from "./pages/admin/CreateProduct/CreateProduct";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
    
    {showLogin?<Login setShowLogin={setShowLogin} showLogin={showLogin} setShowSignup={setShowSignup}/>:<></>}
    {showSignup?<Signup setShowSignup={setShowSignup} showSignup={showSignup} setShowLogin={setShowLogin}/>:<></>}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
