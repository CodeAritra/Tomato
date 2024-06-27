import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";

// Create a Provider Component
function AppProvider({ children }) {
  const [show, setShow] = useState({ success: "false", id: "" });
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [cart, setCart] = useState([]);

  const [auth, setAuth] = useState({
    user: "",
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("token");
    const parsed = JSON.parse(data);
    if (data) {
      setAuth({
        user: parsed.user,
        token: parsed.token,
      });
    }
  }, []);

  // useEffect(()=>{
  //   console.log(show);
  // },[show])

  return (
    <AppContext.Provider
      value={{
        showLogin,
        setShowLogin,
        showSignup,
        setShowSignup,
        setAuth,
        auth,
        product,
        setProduct,
        show,
        setShow,
        productId,
        setProductId,
        quantity,
        setQuantity,
        cart,
        setCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
