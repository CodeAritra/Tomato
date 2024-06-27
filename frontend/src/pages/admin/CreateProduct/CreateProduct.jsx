import React, { useContext, useEffect, useState } from "react";
import "./createproduct.css";
import axios from "axios";
import Sidebar from "../../../components/sidebar/Sidebar"
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"


function CreateProduct() {
  const navigate = useNavigate()

  const [productData, setProductData] = useState({
    bookname: "",
    quantity:"",
    price: "",
  });

  const handlechange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    let data = localStorage.getItem("token");
    let parsed = JSON.parse(data)
    let token = parsed.token
    try {

      const {data} = await axios.post(
        "http://localhost:5000/product/create-product",productData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
     if(data.success){
      // console.log(data)
      toast.success(data.message)
      navigate("/product-list")
      // setProduct(...product,data.product)
     };
    } catch (error) {
      console.log(error);
      toast.error(error)
    }
  };

//   useEffect(()=>{
//     console.log(product);
// },[product])

  return (
    <div className="create-product">
      <div className="product-sidebar">
        <Sidebar />
      </div>
      <div className="productform">
        <h1 className="title-dashboard">Create Product</h1>
        <form onSubmit={handlesubmit}>
          <input
            className="product"
            type="text"
            name="bookname"
            placeholder="Book Name"
            onChange={handlechange}
            value={productData.bookname}
          />
          <input
            className="product"
            type="text"
            name="price"
            placeholder="Price"
            onChange={handlechange}
            value={productData.price}
          />
          <input
            className="product"
            type="text"
            name="quantity"
            placeholder="Quantity"
            onChange={handlechange}
            value={productData.quantity}
          />
          <button className="btndashboard" type="submit">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
