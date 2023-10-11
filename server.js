const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path =require ("path")
const port = process.env.PORT || 5000;
// enable CORS
app.use(cors());
app.use(express.json())

require('./models/product')
require('./models/categories')
require('./models/user')
require('./models/order')
require('./models/subscription')
require('./models/contact')


app.use(require("./routes/product"))
app.use(require("./routes/categories"))
app.use(require("./routes/cart"))
app.use(require("./routes/order"))
app.use(require("./routes/user"))
app.use(require("./routes/loggedUser"))
app.use(require("./routes/subscription"))
app.use(require("./routes/contact"))
// stripe webhook
// app.use(require("./routes/webhook"))

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_DATABADE,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log(error);
});


//serving the frontend
app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res)=>{
  res.sendFile(
    path.join(__dirname,"./frontend/build/index.html"),
    function (err){
      res.status(500).send(err)
    }
  )
})


// start the server

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});