import React, { useContext, useEffect, useState } from "react";
import "./userorder.css";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";

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
        cartData.push(ele.bookname);
      }
    });

    const orderdata = {
      items: cartData,
      amount: total,
      address: deliveryData,
    };

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
      let options = {
        key: "rzp_test_zPOYkBoYoPgKnD", // Enter the Key ID generated from the Dashboard
        amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Book store",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: res.data.razoppayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      let rzp1 = new Razorpay(options);
      rzp1.open();
      e.preventDefault();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handlesubmit} className="userorder">
      <div className="delivery">
        <h1 className="title-delivery">Delivery Details</h1>
        <input
          required
          type="text"
          placeholder="First Name"
          className="first  form"
          name="first"
          onChange={handlechange}
          value={deliveryData.first}
        />
        <input
          required
          type="text"
          placeholder="Last Name"
          className="first second form"
          name="last"
          onChange={handlechange}
          value={deliveryData.last}
        />
        <input
          required
          type="text"
          placeholder="Email Address"
          className="email form"
          name="email"
          onChange={handlechange}
          value={deliveryData.email}
        />
        <input
          required
          type="text"
          placeholder="Address"
          className="email form"
          name="address"
          onChange={handlechange}
          value={deliveryData.address}
        />
        <input
          required
          type="text"
          placeholder="State"
          className="first form"
          name="state"
          onChange={handlechange}
          value={deliveryData.state}
        />
        <input
          required
          type="text"
          placeholder="Zip Code"
          className="first second form"
          name="zip"
          onChange={handlechange}
          value={deliveryData.zip}
        />
        <input
          required
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
          <div id="dropin-container"></div>
          <button type="submit" className="btn-pay ">
            Proceed to pay
          </button>
        </div>
      </div>
    </form>
  );
}

export default Userorder;
