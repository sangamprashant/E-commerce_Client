const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = mongoose.model("product");

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
