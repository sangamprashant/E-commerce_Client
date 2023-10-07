const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const User = mongoose.model("client");
const Product = mongoose.model("product");
const Order = mongoose.model("order");
  
router.get("/api/user/data",requireLogin, async(req,res)=>{
  const {_id} = req.user;
  const user = await User.findById({_id});
  if(!user){
    return res.status(404).json({message:"Invalid user"});
  }
//   console.log(user.orders)
   return res.status(200).json({user})
})


module.exports = router;
