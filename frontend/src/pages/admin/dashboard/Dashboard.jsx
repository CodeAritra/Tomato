import React from 'react'
import "./dashboard.css"
import Card from "../../../components/card/Card"
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='admin-dashboard'>
        <h1 className='title-dashboard'>Admin Dashboard</h1>
        <Link to='/create-product' className='btn-dashboard link'>Create Product</Link>
        <div className='body-dashboard'>
            <Card/>
        </div>
    </div>
  )
}

export default Dashboard