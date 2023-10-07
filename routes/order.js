const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const router = express.Router();
const User = mongoose.model("client");
const Product = mongoose.model("product");
const Order = mongoose.model("order");

router.post("/api/make/order", requireLogin, async (req, res) => {
    try {
      const { name,email,city,postalCode,street,country,CartProducts,phone,APhone,total } = req.body;
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
              product_data: { 
                name: productInfo.title,
                image: productInfo.images[0]
               },
              unit_amount: quantity * productInfo.price,
            },
          });
        }
      }
  
      const order = new Order({
        name, email, city, postalCode, street, country,line_items,phone,APhone,total,paid:false,status:"Ordered"
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
  
// router.get("/api/get/user/order",requireLogin, async(req,res)=>{
//   const {_id} = req.user;
//   // console.log(_id)
//   const user = await User.findById({_id});
//   if(!user){
//     return res.status(404).json({message:"Invalid user"});
//   }
//   console.log(user.orders)
//    return res.status(200).json({user})
// })



router.post("/api/order", async (req, res) => {
  try {
    const ids = req.body.ids;
    // Find products based on the provided product IDs
    const products = await Order.find({ _id: { $in: ids } }).sort({ updatedAt: -1 });
    // Filter out products that were not found (empty array)
    const existingProducts = products.filter((product) => product);
    res.status(200).json(existingProducts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
});

module.exports = router;
