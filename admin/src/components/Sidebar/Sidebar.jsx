import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListIcon from '@mui/icons-material/List';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, IconButton, Typography } from '@mui/material';
import CIcon from '@coreui/icons-react';
import { cilHome } from '@coreui/icons';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/admin/home' className="sidebar-option">
                <HomeIcon sx={{
                    color: 'black',
                    fontSize: 30,
                    border: '2px solid black',  // Add black border
                    borderRadius: '50%',        // Optional: make the border circular
                    padding: '2px',             // Optional: space between the icon and the border
                 }}/>
                {/* style={{ color: "white" }} */}
                {/* <CIcon icon={cilHome} style={{ fontSize: '2px'}}/> */}
            </NavLink>
            <p>Home</p>
        </div>
        <div className="sidebar-options">
            <NavLink to='/admin/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
            </NavLink>
            <p>Add Items</p>
        </div>  
        <div className="sidebar-options">
            <NavLink to='/admin/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
            </NavLink>
            <p>List Items</p>
        </div>  
        <div className="sidebar-options">
            <NavLink to='/admin/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
            </NavLink>
            <p>Orders</p>
        </div>  
    </div>
  )
}

export default Sidebar
