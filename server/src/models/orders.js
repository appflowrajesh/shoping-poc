const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const ordersSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      default: "",
    },
    qty: {
      type: Number,
      default: 0,
    },
    product: {
      type: ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

mongoose.model("Orders", ordersSchema);
