import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = process.env.FRONTEND_URL;

// Function to generate payment session
const generatePaymentSession = async (order) => {
  const line_items = order.items.map(item => ({
    price_data: {
      currency: 'usd', // Use the appropriate currency
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // Stripe expects the amount in cents
    },
    quantity: item.quantity,
  }));

  // Create the Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: line_items,
    mode: 'payment',
    success_url: `${frontend_url}/verify?success=true&orderId=${order._id}`,
    cancel_url: `${frontend_url}/verify?success=false&orderId=${order._id}`,
  });

  return session.url; // Return the session URL
};

// Placing user order from frontend
const placeOrder = async (req, res) => {
    const { userId, items, amount, address } = req.body;
  
    try {
      // Ensure that all required data is present
      if (!userId || !items || !amount || !address) {
        return res.status(400).json({ success: false, message: "Missing required data" });
      }
  
      // Extract country, state, and zip from address
      const { country, state, zip } = address;
  
      // Create a new order with the appropriate fields
      const newOrder = new orderModel({
        userId,
        items,
        amount,
        address, // The address will remain as an object
        country, // The extracted country
        state,   // The extracted state
        zip,     // The extracted zip
        status: "pending", // or any other status
      });
  
      // Save the order to the database
      const savedOrder = await newOrder.save();
  
      // Generate the Stripe payment session
      const session_url = await generatePaymentSession(savedOrder);
  
      // Send the session URL to the frontend to redirect the user to the Stripe payment page
      res.json({ success: true, session_url });
  
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ success: false, message: "Failed to place order" });
    }
  };
  

// Other functions...
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updatestatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updatestatus };
