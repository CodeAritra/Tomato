import React from "react";

function Table({ bookname, price, quantity, action, img }) {
  return (
    <tr>
      <td>
      <img
          src={`http://localhost:5000/${img}`}
          alt=""
          style={{ width: "12vw", height: "auto" }}
        />
      </td>
      <td>{bookname}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{action}</td>
    </tr>
  );
}

export default Table;
