import React, { useEffect, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";
import Sidebar from '../../components/Sidebar/Sidebar';

const { VITE_BACKEND_URL } = import.meta.env;

const List = () => {
  const [list, setList] = useState([]);

  // Fetch list from the backend
  const fetchList = async () => {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}api/product/list`, {
        method: "GET",
      });

      const res = await response.json();

      if (res.success) {
        setList(res.data);
      } else {
        toast.error("Failed to fetch the list.");
      }
    } catch (error) {
      console.error("Error fetching the list:", error);
      toast.error("Error fetching the list.");
    }
  };

  // Remove a product by ID
  const removeProduct = async (productId) => {
    try {
      console.log(productId);
      const response = await fetch(
        `${VITE_BACKEND_URL}api/product/remove`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productId }), // Send the ID in the request body
        });
    
      const res = await response.json();
      if (res.success) {
        toast.success(res.message);
        fetchList();
      } else {
        toast.error("Failed to remove the product.");
      }
    } catch (error) {
      console.error("Error removing the product:", error);
      toast.error("Error removing the product.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='app-content'>
        <Sidebar />
        <div className="list add flex-col">
          <p>All Product List</p>
          <div className="list-table">
            <div className="list-table-format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Stock</b>
              <b>Action</b>
            </div>
            {list.map((item, index) => (
              <div key={index} className="list-table-format">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p>{item.stock}</p> {/* Display stock value */}
                <p onClick={() => removeProduct(item._id)} className="cursor">
                  X
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    
};

export default List;
