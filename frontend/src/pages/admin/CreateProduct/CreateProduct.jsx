import React from "react";
import './createproduct.css'

function CreateProduct() {
  return (
    <div className="create-product">
      <h1>Create Product</h1>
      <form className="productform">
        <input className="product" type="text" name="bookname" placeholder="Book Name" />
        <input className="product" type="text" name="description" placeholder="Description" />
        <input className="product" type="text" name="price" placeholder="Price" />
        <input className="product" type="text" name="quantity" placeholder="Quantity" />
        <button>Create Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;
