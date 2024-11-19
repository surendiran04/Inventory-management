import fs from 'fs';
import path from 'path';
import multer from 'multer';
import productModel from '../models/productModel.js';
import { fileURLToPath } from 'url'; // Necessary for __dirname in ES modules

// Resolve __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Setup Multer for storing uploaded files
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // Store images in the "uploads" folder
//         const uploadPath = path.join(__dirname, '../../uploads');
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true }); // Ensure folder creation
//         }
//         cb(null, uploadPath); // Destination folder
//     },
//     filename: (req, file, cb) => {
//         // Generate a unique filename for each image
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + path.extname(file.originalname)); // Store with original file extension
//     }
// });

// // Create an upload middleware for a single image file
// const upload = multer({ 
//     storage: storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024, // Max file size: 5MB
//         fieldSize: 10 * 1024 * 1024 // Max field size: 10MB
//     }
// }).single('image');

// Add a new product
const addProduct = async (req, res) => {
    // upload(req, res, async (err) => {
    //     if (err) {
    //         console.error('File Upload Error:', err);
    //         return res.status(500).json({ 
    //             success: false, 
    //             message: 'Error uploading file', 
    //             error: err.message 
    //         });
    //     }
    console.log("called",req.body)
    try {
        const { name, description, price, category, stock, image } = req.body;
    
        // Validate required fields
        if (!name || !description || !price || !category || !stock || !image) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if a product with the same name already exists
        const existingProduct = await productModel.findOne({ name });
    
        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product with this name already exists'
            });
        }
    
        // Create a new product
        const product = new productModel({
            name,
            description,
            price: Number(price), // Ensure price is a number
            category,
            stock: Number(stock), // Ensure stock is a number
            image // Store image filename in the database
        });
    
        // Save the product to the database
        await product.save();
    
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: product
        });
    } catch (error) {
        console.error('Add Product Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error adding product',
            error: error.message
        });
    }
    
    // });
};
const listById = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id); // Query the database for the product
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

// List all products
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Fetch Products Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Remove product by ID (from the request body)
const removeProduct = async (req, res) => {
    const { id } = req.body; // Get the product ID from the request body
    try {
        // Validate if the ID is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required',
            });
        }

        // Find the product by ID and delete it
        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product removed successfully',
            data: deletedProduct,
        });
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({
            success: false,
            message: 'Error removing product',
            error: error.message,
        });
    }
};



export { addProduct, listProduct,removeProduct,listById };

