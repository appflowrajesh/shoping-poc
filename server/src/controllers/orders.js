const mongoose = require("mongoose");
const Orders = mongoose.model("Orders");

exports.createOrder = async (req, res) => {
  const { amount, qty, productId } = req.body;
  try {
    const order = await new Orders({
      amount,
      qty,
      product: productId,
    });

    order
      .save()
      .then((result) => {
        res.status(200).json({
          data: result,
          status: true,
          message: "order created successfully",
        });
      })
      .catch((err) => {
        res.status(400).json({ status: false, error: err });
      });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports.allOrders = async (req, res) => {
  //-1 decs
  // 1 acending

  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    Orders.find()
      .sort([["createdAt", -1]])
      .populate("product", "_id productName price imgUrl")
      .limit(limit)
      .skip(skipIndex)
      .exec(function (err, orders) {
        Orders.count().exec(function (err, count) {
          res.status(200).json({
            status: true,
            data: orders,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalCount: count,
          });
        });
      });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports;
