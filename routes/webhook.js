// const express = require("express");
// const bodyParser = require("body-parser");
// const stripe = require("stripe")(process.env.STRIPE_SECRIT_KEY);
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// const router = express.Router();

// // Use bodyParser.raw middleware to parse raw request body
// router.use(
//   bodyParser.raw({
//     type: "application/json",
//     verify: (req, res, buf) => {
//       req.body = buf.toString(); // Store the raw request body
//     },
//   })
// );

// router.post("/api/webhook", async (req, res) => {
//   try {
//     const sig = req.headers["stripe-signature"];
//     const rawBody = req.body; // Access the raw request body

//     // console.log("Signature Header:", sig);
//     // console.log("Raw Request Body:", rawBody);

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
//       console.log(event)
//     } catch (err) {
//     //   res.status(400).send(`Webhook Error: ${err}`);
//     }

//     // Handle the event
//     switch (event?.type) {
//       case "payment_intent.succeeded":
//         const paymentIntentSucceeded = event.data.object;
//         console.log(paymentIntentSucceeded);
//         // Then define and call a function to handle the event payment_intent.succeeded
//         break;
//       // ... handle other event types
//       default:
//         // console.log(`Unhandled event type ${event.type}`);
//     }

//     res.status(200).end();
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
