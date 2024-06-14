import React from 'react'
import "../assets/css/sidebar.css"
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar1'>
        <h1>Dashboard</h1>
        <div className='adminLinks'>
            <Link className='adminSidebarLinks' to='/admin/products'>Products</Link>
            <Link className='adminSidebarLinks' to='/admin/addProduct'>Add Products</Link>
            <Link className='adminSidebarLinks' to='/admin/orders'>Orders</Link>
            <Link className='adminSidebarLinks' to='/admin/Users'>Users</Link>
        </div>
    </div>
  )
}

export default Sidebar