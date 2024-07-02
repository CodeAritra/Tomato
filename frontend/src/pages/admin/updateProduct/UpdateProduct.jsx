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

  const [imageFile, setImageFile] = useState(null);

  const handlechange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    let id = show.id;
    setShow({success:"false",id:""})
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
        const {data} = await axios.put(
          `http://localhost:5000/product/update-product/${id}`,formData,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
       if(data.success){
         console.log(data)
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
              placeholder="book name"
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
          </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
