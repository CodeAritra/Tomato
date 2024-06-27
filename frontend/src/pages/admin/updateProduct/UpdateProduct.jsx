import React, { useContext,useState,useEffect } from "react";
import AppContext from "../../../context/AppContext";
import axios from "axios"
import {toast} from "react-toastify"
import Sidebar from "../../../components/sidebar/Sidebar";

function UpdateProduct() {
  const { show,setShow } = useContext(AppContext);

  const [productData, setProductData] = useState({
    bookname: "",
    quantity: "",
    price: "",
  });

  const handlechange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    let id = show.id;
    setShow({success:"false",id:""})
    let data = localStorage.getItem("token");
    let parsed = JSON.parse(data);
    let token = parsed.token;
    try {
        const {data} = await axios.put(
          `http://localhost:5000/product/update-product/${id}`,productData,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
       if(data.success){
        // console.log(data)
        toast.success(data.message)
       };
      } catch (error) {
        console.log(error);
        toast.error(error)
      }
  };

  useEffect(()=>{
    console.log(productData);
  },[productData])

  return (
    <>
      <div className="create-product">
        <div className="product-sidebar">
          <Sidebar />
        </div>
        <div className="productform">
          <h1 className="title-dashboard">Update Product</h1>
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
            Update Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
