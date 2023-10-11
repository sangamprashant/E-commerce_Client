const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Subscription = mongoose.model("subscription");
const nodemailer = require("nodemailer");

// Route to handle email subscription
router.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists in subscriptions
    const existingSubscription = await Subscription.findOne({ email });

    if (existingSubscription) {
      return res.status(400).json({ message: "Email is already subscribed." });
    }

    // Create a new subscription document
    const newSubscription = new Subscription({
      email,
    });

    // Save the subscription to the database
    await newSubscription.save();

    // Send a confirmation email (you can customize this part)
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Replace with your own email address
        pass: process.env.EMAIL_PASSWORD, // Replace with your own email password
      },
    });

    const mailOptions = {
      from: `"Kloth" <${process.env.EMAIL}>`,
      to: email,
      subject: "Subscription Confirmation",
      text: "Thank you for subscribing to our newsletter!",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "Subscription successful." });
  } catch (error) {
    console.error("Error subscribing: ", error);
    res.status(500).json({ message: "Subscription failed. Please try again." });
  }
});

module.exports = router;
