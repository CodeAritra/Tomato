import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar"

function Dashboard() {
  return (
    <>
      <div className="admin-dashboard">
     <div><Sidebar/></div>
      <div className="dashboard-body">
        <h1>Admin Details</h1>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
