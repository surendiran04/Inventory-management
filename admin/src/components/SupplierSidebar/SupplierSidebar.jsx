import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import './SupplierSidebar.css'

function SupplierSidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
            </NavLink>
            <p>Add Items</p>
        </div>
    </div>
  )
}

export default SupplierSidebar
