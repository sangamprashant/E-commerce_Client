const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Product = mongoose.model("product");

router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({isDeleted:false}).populate("category").sort({ _id: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch all products" });
  }
});

router.get("/api/products/latest", async (req, res) => {
  try {
    const products = await Product.find({isDeleted:false}).sort({ _id: -1 }).limit(4);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch latest products" });
  }
});

router.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id }).populate("category");
    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch the product" });
  }
});

router.get("/api/products/by/category/:name", async (req, res) => {
  try {
    const { name } = req.params;
    // console.log(name)
     await Product.find({isDeleted:false})
      .populate({
        path: "category",
        match: { name: name }, 
        select: "name", 
      }).sort({ _id: -1 })
      .then(( products) => {
          // Filter products that have a matching category
          const filteredProducts = products.filter(
            (product) => product.category !== null
          );
          // Now, filteredProducts contains products in the specified category
          res.status(200).json(filteredProducts);
        
      });
    // console.log(product)
    // res.status(200).json(products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch the product" });
  }
});

module.exports = router;
