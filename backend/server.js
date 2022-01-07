const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

//routes
const authRoutes = require("./routes/authRoutes");

//app
const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected")).catch = (err) => {
  console.log(err.message);
};

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//route middleware
app.use("/api", authRoutes);

//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
