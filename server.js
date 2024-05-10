require("dotenv").config();
const express = require("express");
const app = express();
const { logger } = require("./middlewares/logEvents");
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const connectDB = require("./config/dbCon");
const credentials = require("./middlewares/credentials");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require('./middlewares/verifyJWT');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const path = require('path');

connectDB();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/', require('./routes/root'));
app.use("/register", require("./routes/regestier"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
app.use("/books", require("./routes/books"));
app.use("/updateCount",require('./routes/count'))
app.use("/cart",require('./routes/cart'))
app.use('/genres',require("./routes/genresRouters"))
app.use('/order',require('./routes/Orders'))
app.use('/order/refund',require('./routes/refund'))

app.use('/user',require('./routes/User'))

app.get('/config',(req,res)=>{
  res.send({
    publishableKey:process.env.STRIPE_PUBLISHABLE_KEY
  })
})
app.post('/create-payment-intent', async(req,res)=>{
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'eur',
      amount: req.body.amount,
      payment_method: 'pm_card_visa_cartesBancaires',
        automatic_payment_methods: {
    enabled: true,
  },
      // This is the correct way to enable automatic confirmation for card payments
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error); 
    res.status(400).send({ message: error.message });
  }
});


app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
