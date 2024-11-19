import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!userData.cartData) {
            userData.cartData = {};
        }

        userData.cartData[itemId] = (userData.cartData[itemId] || 0) + 1;
        await userData.save();
        res.json({ success: true, message: "Added to Cart", cartData: userData.cartData });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Error while adding to cart" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const userData = await userModel.findById(userId);

        if (!userData || !userData.cartData || !userData.cartData[itemId]) {
            return res.json({ success: false, message: "Item not found in cart" });
        }

        userData.cartData[itemId] -= 1;

        if (userData.cartData[itemId] <= 0) {
            delete userData.cartData[itemId];
        }

        await userData.save();

        res.json({ success: true, message: "Removed from Cart", cartData: userData.cartData });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ success: false, message: "Error while removing from cart" });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
};

export { addToCart, removeFromCart, getCart };
