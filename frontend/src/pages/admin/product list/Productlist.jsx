import React, { useContext, useEffect, useState } from "react";
import "./productlist.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import AppContext from "../../../context/AppContext";
import axios from "axios";
import Table from "./Table";
import UpdateProduct from "../updateProduct/UpdateProduct";

function Productlist() {
  const { product, setProduct, setShow, show } = useContext(AppContext);

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

  const remove = async (id) => {
    let data = localStorage.getItem("token");
    let parsed = JSON.parse(data);
    let token = parsed.token;

    try {
      let deletedproduct = await axios.delete(
        `http://localhost:5000/product/delete-product/${id}`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      console.log(deletedproduct);
    } catch (error) {
      console.log(error);
    }
  };

  const handleupdate = (id) => {
    setShow(true);
    console.log("clicked");
    update(id);
  };

  const update = async (id) => {
    let data = localStorage.getItem("token");
    let parsed = JSON.parse(data);
    let token = parsed.token;

    try {
      let updatedproduct = await axios.put(
        `http://localhost:5000/product/update-product/${id}`,
        productData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      console.log(updatedproduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [remove]);

  return (
    <>
      {show.success === "true" ? (
        <>
          <UpdateProduct />
        </>
      ) : (
        <>
          <div className="create-product">
            <div className="product-sidebar">
              <Sidebar />
            </div>
            <div className="product-list">
              {product.length > 0 ? (
                <>
                  <h1 className="title-productlist">Product List</h1>
                  <div className="productitems">
                    <table className="styled-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Book Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.map((p) => (
                          <Table
                            key={p._id}
                            bookname={p.bookname}
                            price={p.price}
                            quantity={p.quantity}
                            action={
                              <>
                                <button
                                  className="btnup"
                                  onClick={() =>
                                    setShow({ success: "true", id: p._id })
                                  }
                                >
                                  Update
                                </button>
                                <button
                                  className="btndel"
                                  onClick={() => remove(p._id)}
                                >
                                  Delete
                                </button>
                              </>
                            }
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <h1>No Products</h1>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Productlist;
