import React from "react";

function Table({bookname,price,quantity,action}) {
  return (
    <tr>
      <td>yo</td>
      <td>{bookname}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{action}</td>
    </tr>
  );
}

export default Table;
