const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { productName, price, imgUrl } = req.body;
    const product = await new Product({
      productName,
      price,
      imgUrl,
    });

    product
      .save()
      .then((result) => {
        res.status(200).json({
          data: result,
          status: true,
          message: "product created successfully",
        });
      })
      .catch((err) => {
        res.status(400).json({ status: false, error: err.message });
      });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports.allProducts = async (req, res) => {
  //-1 decs
  // 1 acending

  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    Product.find()
      .sort([["createdAt", -1]])
      .limit(limit)
      .skip(skipIndex)
      .exec(function (err, products) {
        Product.count().exec(function (err, count) {
          console.log(count);
          res.status(200).json({
            status: true,
            data: products,
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

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json({ status: true, data: product });
    }
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports.searchProduct = (req, res) => {
  const { query } = req.params;
  try {
    let userPattern = new RegExp("^" + query.toLowerCase(), "i");
    Product.find({ productName: { $regex: userPattern } })

      .then((product) => {
        res.json({ status: true, data: product });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    Product.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json({ status: true, data: result });
      })
      .catch((err) => {
        res.status(400).json({ status: false, error: err.message });
      });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};
