const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const User = mongoose.model("client");
const Product = mongoose.model("product");

router.post("/api/add/to/cart", requireLogin, async (req, res) => {
  try {
    // Get the user's ID from the authenticated request
    const userId = req.user._id;
    // Get the product IDs to add to the cart from the request body
    const { productId } = req.body;
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Ensure productId is an array (wrapping a single ID if needed)
    const productIds = Array.isArray(productId) ? productId : [productId];
    // Add productIds to the user's cart
    user.carts.push(...productIds);
    // Save the updated user document
    await user.save();
    res.status(200).json({ message: "Products added to cart successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to add products to the cart" });
  }
});

//remove one
router.post("/api/remove/from/cart", requireLogin, async (req, res) => {
  try {
    // Get the user's ID from the authenticated request
    const userId = req.user._id;
    // Get the product ID to remove from the cart from the request body
    const { productId } = req.body;
    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Find the index of the first occurrence of the specified product ID
    const indexToRemove = user.carts.findIndex((cartProductId) => cartProductId.toString() === productId.toString());
    
    if (indexToRemove !== -1) {
      // Remove the first occurrence of the specified product ID from the user's cart
      user.carts.splice(indexToRemove, 1);
      
      // Save the updated user document
      await user.save();
      
      res.status(200).json({ message: "Product removed from cart successfully" });
    } else {
      res.status(404).json({ message: "Product not found in the cart" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to remove product from the cart" });
  }
});

//remove all of same 
router.post("/api/remove/all/from/cart", requireLogin, async (req, res) => {
  try {
    // Get the user's ID from the authenticated request
    const userId = req.user._id;
    // Get the product ID to remove from the cart from the request body
    const { productId } = req.body;
    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Remove the specified product ID from the user's cart
    user.carts = user.carts.filter((cartProductId) => cartProductId.toString() !== productId.toString());
    
    // Save the updated user document
    await user.save();
    
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to remove product from the cart" });
  }
});

router.post("/api/cart",requireLogin, async (req, res) => {
  try {
    const ids = req.body.ids;
    // Find products based on the provided product IDs
    const products = await Product.find({ _id: { $in: ids } });
    // Filter out products that were not found (empty array)
    const existingProducts = products.filter((product) => product);
    res.status(200).json(existingProducts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
});


module.exports = router;
