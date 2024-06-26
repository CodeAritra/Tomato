import React from "react";

function Table({
  bookname,
  price,
  quantity,
  action,
  img
}) {
  return (
    <tr>
      <td>{img}</td>
      <td>{bookname}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{action}</td>
      
    </tr>
  );
}

export default Table;
