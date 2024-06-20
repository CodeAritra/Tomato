import React, { useContext } from 'react'
import "./sidebar.css"
import {Link} from "react-router-dom"
import AppContext from '../../context/AppContext'

function Sidebar() {
  const {setShowupdate} = useContext(AppContext)
  return (
    <div className="sidebar ">
    <div className="sidebar-header">
      <h2>Admin Dashboard</h2>
    </div>
    <div className="sidebar-content">
      <ul className="sidebar-menu">
        <li>
          <Link to="/create-product">Create Product</Link>
        </li>
        <li>
          <Link to="/product-list" onClick={()=>setShowupdate(false)}>Product List</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default Sidebar