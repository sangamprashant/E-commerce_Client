// const express = require("express");
// const bodyParser = require("body-parser");
// const stripe = require("stripe")(process.env.STRIPE_SECRIT_KEY);
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// const router = express.Router();

// Use bodyParser.raw middleware to parse raw request body
// router.use(
//   bodyParser.raw({
//     type: "application/json",
//     verify: (req, res, buf) => {
//       req.body = buf.toString(); // Store the raw request body
//     },
//   })
// );



// router.post('/webhook', express.json({type: 'application/json'}), (request, response) => {
//   const event = request.body;

//   console.log("done be happy.")

//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const paymentIntent = event.data.object;
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       console.log(paymentIntent)
//       break;
//     default:
//       // console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a response to acknowledge receipt of the event
//   response.json({received: true});
// });



// module.exports = router;
