import React from "react";
import "./card.css";

function Card() {
  return (
    <div className="card">
      <img className="card-img" src="" alt="" />
      <div className="card-body">
        <div>
          <h5 class="card-title">Biriyani</h5>
          <p class="card-text">price</p>
        </div>
        <div>
            <select name="" id="">1</select>
            <select name="" id="">Half</select>
        </div>
        <button>Add to cart</button>
      </div>
    </div>
  );
}

export default Card;
