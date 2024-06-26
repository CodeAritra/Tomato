import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Ordertable from "../product list/Ordertable";
import axios from "axios";

function Orders() {
  const [order, setOrder] = useState([]);

  let allorder = async () => {
    try {
      let data = localStorage.getItem("token");
      let parsed = JSON.parse(data);
      let token = parsed.token;
      let res = await axios.get("http://localhost:5000/order/admin", {
        headers: {
          authorization: `${token}`,
        },
      });
      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allorder();
  }, []);

  useEffect(() => {
    console.log("order = ", order);
  }, [order]);


  return (
    <div className="create-product">
      <div className="product-sidebar">
        <Sidebar />
      </div>
      <div className="">
        <h1 className="title-productlist">Orders</h1>
        <div className="productitems">
          <table className="styled-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Items</th>
                <th>Total</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {order.map((o) => (
                <Ordertable
                  key={o._id}
                  username={o.userId}
                  total={o.amount}
                  address={o.address.address}
                  payment={o.payment}
                  status={o.status}
                  items={o.items}
                  contact={o.address.phone}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
