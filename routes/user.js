const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// Signup route
router.post("/verify/user/email", async (req, res) => {
  const { email, name } = req.body;

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const subject = "Your One-Time Password (OTP) for Verification";

  const otp = Math.floor(100000 + Math.random() * 900000);

  const message = `Dear ${name},
  
  Thank you for choosing our platform. As part of the registration process, we require you to verify your account using a One-Time Password (OTP). Please find your OTP below:
  
  OTP: ${otp}
  
  Please enter this OTP in the designated field to complete your account verification. Please note that the OTP is valid for a limited time and should be kept confidential. Do not share this OTP with anyone.
  
  If you did not initiate this registration process or have any concerns, please disregard this email.
  
  Thank you for your cooperation.
  
  Best regards,
  DrDoc`;

  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL, // Replace with your own email address
      pass: process.env.EMAIL_PASSWORD, // Replace with your own email password
    },
  });

  // Set up email data
  let mailOptions = {
    from: `"DrDoc" <${process.env.EMAIL}>`, // Replace with your own name and email address
    to: email,
    subject: subject,
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to send email" });
    }
    console.log("Email sent: %s", info.messageId);
    res.status(200).json({ message: "Email sent successfully", otp: otp });
  });
});
// Signup route
router.post("/signup/new/user", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the email is already registered
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash and salt the password
    const saltRounds = 10; // Number of salt rounds, higher is more secure
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new admin with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ adminId: newUser._id }, process.env.AUTH_SECRET);

    res.status(200).json({ message: "Signup successful", user: newUser,token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// Login route
router.post("/api/user/do/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the admin by email
    const admin = await User.findOne({ email });

    // If the admin does not exist, return an error
    if (!admin) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Create a JWT token with the admin's ID as the payload
    const token = jwt.sign({ adminId: admin._id }, process.env.AUTH_SECRET);

    // Send the token and admin details as a response
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
