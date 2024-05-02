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