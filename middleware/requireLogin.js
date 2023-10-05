const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const USER = mongoose.model("client");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must have logged in 1" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.AUTH_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must have logged in 2" });
    }
    const { adminId } = payload;
    USER.findById({_id:adminId}).then((userData) => {
      req.user = userData;
      next();
    });
  });
};
