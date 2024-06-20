import React, { useContext, useEffect } from "react";
import "./homepage.css";
import axios from "axios";
import Card from "../../components/card/Card";
import AppContext from "../../context/AppContext";

function Homepage() {
  const { product, setProduct } = useContext(AppContext);

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

  // useEffect(() => {
  //   console.log(product);
  // }, [product]);

  return (
    <div className="homepage">
      {product.map(p => (
          <Card key={p._id} name={p.bookname} price={p.price}/>
        ))}
      
    </div>
  );
}

export default Homepage;
