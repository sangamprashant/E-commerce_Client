const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const User = mongoose.model("client");
const Product = mongoose.model("product");
const Order = mongoose.model("order");

router.post("/api/make/order", requireLogin, async (req, res) => {
    try {
      const { name,email,city,postalCode,street,country,CartProducts,phone,APhone } = req.body;
      const user = await User.findById({ _id: req.user._id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Ensure CartProducts is an array
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
            priceData: {
              Currency: "REPEES",
              product_data: { name: productInfo.title },
              unit_amount: quantity * productInfo.price,
            },
          });
        }
      }
  
      const order = new Order({
        name, email, city, postalCode, street, country,line_items,phone,APhone,paid:false,status:"Ordered"
      })

      const orderId = Array.isArray(order._id) ? order._id : [order._id];

      user.orders.push(...orderId);
      user.save();
      order.save();
  
      return res.status(200).json({ message: "Updated",order });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ message: "Server error." });
    }
  });
  

module.exports = router;
