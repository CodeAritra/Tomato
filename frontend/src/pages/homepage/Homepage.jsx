import React, { useContext, useEffect, useState } from "react";
import "./homepage.css";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import AppContext from "../../context/AppContext";
import {  toast } from "react-toastify";


function Homepage() {
  const { product, setProduct, quantity, setQuantity,setCart,auth } = useContext(AppContext);

  const [token,setToken] = useState(false)

  const getUser = ()=>{
    let data = localStorage.getItem("token");
    let parsed = JSON.parse(data);
    let token = parsed.token;
    if(token){
      setToken(true)
    }
  }

  useEffect(()=>{
    getUser()
  },[])

  const fetchAllProducts = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/product/allproducts"
    );
    if (data.success) {
      setProduct(data.allproducts);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleQuantityChange = (productId, amount) => {
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
    }));
  };

  // useEffect(() => {
  //   console.log(quantity);
  // }, [quantity]);

  const addtocart = async (id) => {
    try {

      let data = localStorage.getItem("token");
      let parsed = JSON.parse(data);
      let token = parsed.token;
      // console.log(token);

      let dataAdded = await axios.post(
        `http://localhost:5000/cart/add/${id}`,
        { quantity: quantity[id] },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      if(dataAdded.data.success){
        setCart(dataAdded.data.user.cartData)
        // console.log("Added to cart");
      }
      toast.success(dataAdded.data.message)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="homepage">
      {product.map((p) => (
        <div className="card" key={p._id}>
          <img className="card-img" src="" alt="" />
          <div className="card-body">
            <div>
              <h3 className="card-title">Book name - {p.bookname}</h3>
              <p className="card-text">Rs. {p.price}</p>
            </div>
            <div
              className="icon"
              key={p._id}
              onClick={() => handleQuantityChange(p._id, 1)}
            >
              {quantity[p._id] || 1} <FaPlus />
            </div>
          </div>
          <button className="btncard" onClick={() => addtocart(p._id)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Homepage;
