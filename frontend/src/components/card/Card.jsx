import React from "react";
import "./card.css";
import { FaPlus } from "react-icons/fa6";

function Card() {
  return (
    <div className="card">
      <img className="card-img" src="" alt="" />
      <div className="card-body">
        <div>
          <h3 class="card-title">Book name - Author</h3>
          <p class="card-text">price</p>
        </div>
        <div className="icon">1 <FaPlus/></div>
      </div>
      <button className="btncard">Add to cart</button>
    </div>
  );
}

export default Card;
