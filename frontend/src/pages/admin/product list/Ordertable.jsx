import React from "react";

function Ordertable({username,items,total,address,status,payment,contact}) {
  return (
    <tr>
      <td>{username}</td>
      {items.map((ele,index)=>(<tr key={index}><td >{ele}</td></tr>))}
      <td>{total}</td>
      <td>{address}</td>
      <td>{contact}</td>
      <td>{payment?"Done":"Proccessing"}</td>
      <td>{status}</td>
    </tr>
  );
}

export default Ordertable;
