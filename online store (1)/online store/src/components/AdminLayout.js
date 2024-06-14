import React, { useState } from 'react'
import Sidebar from './Sidebar'
import AdminNav from "./AdminNav"
import "../assets/css/adminLayout.css"
const AdminLayout = ({children}) => {
  return (
    <div className='adminlayout'>
    <div className='sidebar'>
        <Sidebar/>
    </div>   
    <div className='adminright'>
        <div className='adminnav'>
            <AdminNav />
        </div>
        <div className='body'>{children}</div>
    </div>
    </div>
  )
}

export default AdminLayout