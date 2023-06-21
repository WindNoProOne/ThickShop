const { Product, Brand } = require("../Models/User");

const productController = {
  addproduct: async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      const saveProduct = await newProduct.save();
      if (req.body.brand) {
        const brand = Brand.findById(req.body.brand);
        await brand.updateOne({ $push: { products: saveProduct._id } });
      }
      return res.status(200).json(saveProduct);
    } catch (error) {
      console.log("Error", error);
      res.status(500).json(error);
    }
  },

  getAllProduct: async (req, res, next) => {
    try {
      const allProduct = await Product.find();
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAnProduct: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id).populate("brand");
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      await product.updateOne({ $set: req.body });
      res.status(200).json("Update successfuly !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Brand.updateMany(
        { products: req.params.id },
        { $pull: { products: req.params.id } }
      );
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfuly!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productController;
