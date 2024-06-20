import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Table from "../product list/Table";

function Orders() {
  return (
    <div className="create-product">
      <div className="product-sidebar">
        <Sidebar />
      </div>
      <div className="product-list">
        <h1 className="title-productlist">Orders</h1>
        <div className="productitems">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Book Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <Table bookname={"python"} price={50} quantity={10} action={"pending"}/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
