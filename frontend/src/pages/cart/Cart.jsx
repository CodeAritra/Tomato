import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import Table from "../admin/product list/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

function Cart() {
  const { cart, setCart } = useContext(AppContext);

  
  const fetchData = async () => {
    try {
      let data = localStorage.getItem("token");
      let parsed = JSON.parse(data);
      let token = parsed.token;
      let alldata = await axios.get("http://localhost:5000/cart/all", {
        headers: {
          authorization: `${token}`,
        },
      });
      if (alldata.data.success) {
        setCart(alldata.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [cart]);

  const remove = async (id) => {
    try {
      let data = localStorage.getItem("token");
      let parsed = JSON.parse(data);
      let token = parsed.token;
      let removedData = await axios.delete(
        `http://localhost:5000/cart/remove/${id}`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      if (removedData.data.success) {
        setCart(removedData.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeall = async () => {
    try {
      let data = localStorage.getItem("token");
      let parsed = JSON.parse(data);
      let token = parsed.token;

      let removedData = await axios.delete(
        "http://localhost:5000/cart/removeall",
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      if (removedData.data.success) {
        console.log("Removed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(cart);
  }, []);

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

  return (
    <div className="cart">
      {cart.length === 0 ? (
        <>
          <h2 className="empty-cart">Cart is empty</h2>
        </>
      ) : (
        <>
          <div className="cart-items">
            <table className="table ">
              <thead>
                <tr>
                  <th>Img</th>
                  <th>Book Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((c) => (
                  <Table
                    key={c._id}
                    bookname={c.bookname}
                    price={c.price}
                    quantity={c.quantity}
                    action={
                      <>
                        <button
                          className="btncart"
                          onClick={() => remove(c.id)}
                        >
                          Remove
                        </button>
                      </>
                    }
                  />
                ))}
              </tbody>
            </table>
            <button className="btncartempty" onClick={removeall}>
              Empty Cart
            </button>
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
              <Link to="/orders" className="btn-pay ">
                Place Order
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
