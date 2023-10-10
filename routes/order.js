const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const User = mongoose.model("client");
const Product = mongoose.model("product");
const Order = mongoose.model("order");
// const stripe = require('stripe')(process.env.STRIPE_SECRIT_KEY);


router.post("/api/make/order", requireLogin, async (req, res) => {
    try {
      const { name,email,city,postalCode,street,country,CartProducts,phone,APhone,total, } = req.body;
      const user = await User.findById({ _id: req.user._id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
        if (!Array.isArray(CartProducts)) {
        return res.status(400).json({ message: "CartProducts should be an array" });
      }
  
      const uniqueIds = [...new Set(CartProducts)];
      const ProductInfos = await Product.find({ _id: uniqueIds });
  
      let line_items = [];
      for (const productId of uniqueIds) {
        const productInfo = ProductInfos.find(p => p._id.toString() === productId);
        const quantity = CartProducts.reduce((count, id) => (id === productId ? count + 1 : count), 0);
        if (quantity > 0 && productInfo) {
          line_items.push({
            quantity,
            price_data: {
              currency: "inr",
              product_data: { 
                name: productInfo.title,
                images:productInfo.images,
               },
              unit_amount: quantity * productInfo.price*100,
            },
          });
        }
      }
  
      const order = new Order({
        name, email, city, postalCode, street, country,line_items,phone,APhone,total,paid:false,status:"confirm"
      })

      // // Create a Stripe payment session
      // if (paid) {
      //     const session = await stripe.checkout.sessions.create({
      //     line_items,
      //     mode: 'payment',
      //     customer_email: email,
      //     success_url: "http://localhost:3001/cart?success=1",
      //     cancel_url: "http://localhost:3001/cart?failed=1",
      //     metadata: { orderId: order._id.toString(),test:"ok" },
      //   });
      //   // console.log(session);
      //   return res.status(200).json({ message: "Payment session created", session });
      // }

      const orderId = Array.isArray(order._id) ? order._id : [order._id];

      user.orders.push(...orderId);
      user.carts=[]
      await user.save();
      await order.save();
  
      return res.status(200).json({ message: "Updated",order });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Server error." });
    }
  });
  
router.post("/api/order", requireLogin, async (req, res) => {
  try {
    const ids = req.body.ids;
    // Find products based on the provided product IDs
    const products = await Order.find({ _id: { $in: ids } }).sort({ updatedAt: -1 });
    // Filter out products that were not found (empty array)
    const order = products.filter((product) => product);
    // console.log(order)
    res.status(200).json(order);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to get products" });
  }
});

module.exports = router;
