import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        // Find the user by userId
        let userData = await userModel.findById(req.body.userId);

        // Ensure that cartData exists
        if (!userData.cartData) {
            userData.cartData = {};
        }

        // Add or update the item in cart
        const itemId = req.body.itemId;
        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = 1;
        } else {
            userData.cartData[itemId] += 1;
        }

        // Save updated cartData to user
        await userData.save();
        
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}



// remove items from user cart
// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Find the user by userId
        let userData = await userModel.findById(req.body.userId);

        // Check if the item exists in the cart
        const itemId = req.body.itemId;
        if (userData.cartData[itemId] && userData.cartData[itemId] > 0) {
            // Decrease quantity or remove item
            userData.cartData[itemId] -= 1;

            // If the quantity reaches 0, remove the item from the cart
            if (userData.cartData[itemId] === 0) {
                delete userData.cartData[itemId];
            }

            // Save updated cartData to user
            await userData.save();

            res.json({ success: true, message: "Removed from Cart" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


// Fetch user cart data
const getCart = async (req, res) => {
    try {
        // Find the user by userId
        let userData = await userModel.findById(req.body.userId);

        // Return the cartData if exists
        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


export {addToCart,removeFromCart,getCart}