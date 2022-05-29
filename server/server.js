const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");

const db = mongoose.connection;
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(
  cors({
    origin: "*",
  })
);

require("./src/models/product");
require("./src/models/orders");

app.use("/api/product", require("./src/routes/product"));
app.use("/api/order", require("./src/routes/orders"));

app.listen(PORT, (req, res) => {
  console.log("server is running on " + PORT);
});
