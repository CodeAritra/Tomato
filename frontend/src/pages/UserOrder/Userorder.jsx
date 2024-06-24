import React, { useContext, useEffect, useState } from "react";
import "./userorder.css";
import axios from "axios";
import AppContext from "../../context/AppContext";

function Userorder() {
  const { cart, setCart } = useContext(AppContext);
  const [deliveryData, setDeliveryData] = useState({
    first: "",
    last: "",
    address: "",
    zip: "",
    state: "",
    email: "",
    phone: "",
  });

  const handlechange = (e) => {
    setDeliveryData((deliveryData) => ({
      ...deliveryData,
      [e.target.name]: e.target.value,
    }));
  };

  // useEffect(() => {
  //   console.log(deliveryData);
  // }, [deliveryData]);

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const calculateQuantity = (cartItems) => {
    let quantities = 0;
    cartItems.forEach((item) => {
      quantities += item.quantity;
    });
    return quantities;
  };

  const total = calculateTotal(cart);
  const quantities = calculateQuantity(cart);

  const handlesubmit = async (e) => {
    e.preventDefault();
    let cartData = [];
    cart.map((ele) => {
      if (cart) {
        cartData.push(ele);
      }
    });
    // console.log("cart data = ", cartData);

    const orderdata = {
      items: cartData,
      amount: total,
      address: deliveryData,
    };

    // console.log("order = ", orderdata);

    try {
      let data = localStorage.getItem("token");
      let parsed = JSON.parse(data);
      let token = parsed.token;
      let res = await axios.post(
        "http://localhost:5000/order/create-order",
        orderdata,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(cart);
  // }, []);

  return (
    <form onSubmit={handlesubmit} className="userorder">
      <div className="delivery">
        <h1 className="title-delivery">Delivery Details</h1>
        <input
          type="text"
          placeholder="First Name"
          className="first  form"
          name="first"
          onChange={handlechange}
          value={deliveryData.first}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="first second form"
          name="last"
          onChange={handlechange}
          value={deliveryData.last}
        />
        <input
          type="text"
          placeholder="Email Address"
          className="email form"
          name="email"
          onChange={handlechange}
          value={deliveryData.email}
        />
        <input
          type="text"
          placeholder="Address"
          className="email form"
          name="address"
          onChange={handlechange}
          value={deliveryData.address}
        />
        <input
          type="text"
          placeholder="State"
          className="first form"
          name="state"
          onChange={handlechange}
          value={deliveryData.state}
        />
        <input
          type="text"
          placeholder="Zip Code"
          className="first second form"
          name="zip"
          onChange={handlechange}
          value={deliveryData.zip}
        />
        <input
          type="text"
          placeholder="Phone"
          className="email form"
          name="phone"
          onChange={handlechange}
          value={deliveryData.phone}
        />
      </div>
      <div>
        <div className="payout">
          <h1 className="payout-title">Summary</h1>
          <div className="placeorder">
            <div>
              <p>Total Items </p>
              <p>Total Amount</p>
            </div>
            <div>
              <p>{quantities}</p>
              <p>Rs. {total}</p>
            </div>
          </div>
          <button type="submit" className="btn-pay ">
            Proceed to pay
          </button>
        </div>
      </div>
    </form>
  );
}

export default Userorder;
