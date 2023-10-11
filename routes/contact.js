const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Contact = mongoose.model("Contact");
const nodemailer = require("nodemailer");

router.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      // Create a new contact entry
      const newContact = new Contact({ name, email, message,responsed:false });
  
      // Save the entry to the database
      await newContact.save();
  
      res.status(200).json({ message: 'Form submitted successfully.' });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Form submission failed. Please try again.' });
    }
  });

module.exports = router;
