import React, { useEffect, useState } from "react";
import "./createproduct.css";
import axios from "axios";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateProduct() {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    bookname: "",
    quantity: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handlechange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    let data = localStorage.getItem("token");
    let parsed = JSON.parse(data);
    let token = parsed.token;

    const formData = new FormData();
    formData.append("bookname", productData.bookname);
    formData.append("quantity", productData.quantity);
    formData.append("price", productData.price);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/product/create-product",
        formData,
        {
          headers: {
            authorization: `${token}`
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/product-list");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="create-product">
      <div className="product-sidebar">
        <Sidebar />
      </div>
      <div className="productform">
        <h1 className="title-dashboard">Create Product</h1>
        <form onSubmit={handlesubmit} className="product-form-adjust" encType="multipart/form-data">
          <div>
            <label htmlFor="imageUpload">Choose an image:</label>
            <input
              type="file"
              id="imageUpload"
              name="image"
              accept="image/*"
              className="img-create"
              onChange={handleFileChange}
            />
          </div>
          <div>
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
