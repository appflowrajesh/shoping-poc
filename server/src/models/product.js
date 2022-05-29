const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },

    imgUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

mongoose.model("Product", productSchema);
