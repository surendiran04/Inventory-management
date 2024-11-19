import React, { useState } from 'react';
import './Add.css';
// import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import Sidebar from '../../components/Sidebar/Sidebar';

const { VITE_BACKEND_URL } = import.meta.env;

const Add = () => {
    // const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image:""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Create FormData object
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("stock", data.stock);
        formData.append("category", data.category);
        formData.append("image", data.image); // Add image file
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        try {
            const response = await fetch(`${VITE_BACKEND_URL}api/product/add`, {
                method: 'POST',
                body: formData, // Use FormData here directly
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Product added successfully!");
                setData({ name: "", description: "", price: "", category: "", stock: "",image:"" });
            } else {
                toast.error(result.message || "Failed to add product");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred while adding the product");
        }
    };

     // Fetch products from Fake Store API and automatically add them
    //  const addProductsAutomatically = async () => {
    //     try {
    //         const response = await fetch('https://fakestoreapi.com/products');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch products');
    //         }
    //         const products = await response.json();
    
    //         if (!Array.isArray(products) || products.length === 0) {
    //             throw new Error('No products found');
    //         }
    
    //         console.log(products);
    
    //         for (let i = 0; i < 20; i++) {
    //             const product = products[i];
    //             if (!product) continue; // Skip if no product exists at index i
    
    //             // Construct form data directly without waiting for `setData`
    //             const formData = new FormData();
    //             formData.append("name", product.title);
    //             formData.append("description", product.description);
    //             formData.append("price", product.price.toString());
    //             formData.append("category", product.category || '');
    //             formData.append("stock", "100"); // Set a default stock value
    //             formData.append("image", product.image);
    
    //             // Log formData before submitting
    //             for (let [key, value] of formData.entries()) {
    //                 console.log(`${key}: ${value}`);
    //             }
    
    //             // Wait for a short delay before submitting each product to prevent overloading the server
    //             await new Promise(resolve => setTimeout(resolve, 1500));
    
    //             // Submit the form directly
    //             await fetch(`${VITE_BACKEND_URL}api/product/add`, {
    //                 method: 'POST',
    //                 body: formData,
    //             });
    
    //             toast.success("Product added successfully!");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching product data:", error);
    //         toast.error(error.message || 'Failed to fetch products');
    //     }
    // };
    
      

    return (
        <div className='app-content'>
        <Sidebar />
            <div className="add">
                <form className="flex-col" onSubmit={onSubmitHandler}>
                    <div className="add-product-name flex-col">
                        <p>Upload Image url</p>
                        <label htmlFor="image">
                            {/* <img
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt="Upload"
                            /> */}
                            <input
                            onChange={onChangeHandler}
                            type="text"
                            id="image"
                            name="image"
                            placeholder="Paste the image url"
                            value={data.image}
                            required
                        />
                        </label>
                        
                    </div>
                    <div className="add-product-name flex-col">
                        <p>Product name</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            name="name"
                            placeholder="Type here"
                            required
                        />
                    </div>
                    <div className="add-product-description flex-col">
                        <p>Product description</p>
                        <textarea
                            onChange={onChangeHandler}
                            value={data.description}
                            name="description"
                            rows="6"
                            placeholder="Write content here"
                            required
                        />
                    </div>
                    <div className="add-category-price">
                        <div className="add-price flex-col">
                            <p>Product price</p>
                            <input
                                onChange={onChangeHandler}
                                value={data.price}
                                type="number"
                                name="price"
                                placeholder="$20"
                                required
                            />
                        </div>
                        <div className="add-price flex-col">
                            <p>Product Stock</p>
                            <input
                                onChange={onChangeHandler}
                                value={data.stock}
                                type="number"
                                name="stock"
                                placeholder="5"
                                required
                            />
                        </div>
                        <div className="add-category flex-col">
                            <p>Product category</p>
                            <input
                                onChange={onChangeHandler}
                                value={data.category}
                                type="text"
                                name="category"
                                placeholder="Clothing"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="add-btn">
                        ADD
                    </button>
                </form>

                {/* <button onClick={addProductsAutomatically}>Add 30 Products Automatically</button> */}
            </div>
        </div>
    );
};

export default Add;

