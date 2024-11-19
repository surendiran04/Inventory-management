import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
const { VITE_BACKEND_URL } = import.meta.env;
import { useAuthContext } from "../../context/authContext";
// import { assets } from '../../assets'

const MyOrders = () => {
  const { user,token } = useAuthContext();
  const [data, setData] = useState([]);

  // Fetch orders using fetch API
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}/api/order/userorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass the token in Authorization header
        },
        body: JSON.stringify({userId:user._id}), // Send empty object as the request body
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data); // Set the fetched data to state
      } else {
        console.error('Failed to fetch orders:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // UseEffect to fetch orders when token is available
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div>
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
          {data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                {/* <img src={assets.parcel_icon} alt="Order Icon" /> */}
                <p>{order.items.map((item, index) => {
                  return index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `;
                })}</p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                <button onClick={fetchOrders}>Track Order</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

