import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
const { VITE_BACKEND_URL } = import.meta.env;
import Sidebar from '../../components/Sidebar/Sidebar';

const Orders = () => {

  const [orders, setOrders] = useState([])

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}api/order/list`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
        console.log(data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  }

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}api/order/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: event.target.value,
        }),
      });
      const data = await response.json();
      if (data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating order status");
    }
  }

  useEffect(() => {
    fetchAllOrders(); 
  }, [])

  return (
    <div className='app-content'>
        <Sidebar />
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => { statusHandler(event, order._id) }} value={order.status}>
              <option value="Order
               Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Orders;

