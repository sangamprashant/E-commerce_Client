const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Categories = mongoose.model("categories");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Get all categories route
router.get('/api/categories', async (req, res) => {
  try {
    const categories = await Categories.find({}).populate("parent");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch the categories" });
  }
});


module.exports = router;
