import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authenticateToken from "../middlewares/auth.js"; // Import the middleware

const cartRouter = express.Router();

// Protect these routes with the authentication middleware
cartRouter.post("/add", authenticateToken, addToCart); // Add to cart route
cartRouter.post("/remove", authenticateToken, removeFromCart); // Remove from cart route
cartRouter.post("/get", authenticateToken, getCart); // Get cart data route

export default cartRouter;
