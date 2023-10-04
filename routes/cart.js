const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const User = mongoose.model("client");
const Product = mongoose.model("product");

router.post('/api/add/to/cart', requireLogin, async (req, res) => {
  try {
    // Get the user's ID from the authenticated request
    const userId = req.user._id;

    // Get the product IDs to add to the cart from the request body
    const { productIds } = req.body;
console.log(productIds)
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the product IDs to the user's cart
    user.carts.push(...productIds);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Products added to cart successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to add products to the cart" });
  }
});

router.post('/api/cart', async (req, res) => {
  try {
    // const { title, description, price, images, category, properties } = req.body;
    const ids= req.body.ids;
    console.log(ids)
    const product = await Product.find({_id:ids})
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get a product" });
  }
});

module.exports = router;
