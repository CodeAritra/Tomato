import React from "react";

function CartTable({ bookname, price, quantity, action,}) {
  return (
    <tr>
      <td>{bookname}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{action}</td>
    </tr>
  );
}

export default CartTable;
