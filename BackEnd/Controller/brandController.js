const { Brand, Product } = require("../Models/User.js");

const brandController = {
  addBrand: async (req, res) => {
    try {
      const newBrand = new Brand(req.body);
      const saveBrand = await newBrand.save();
      res.status(200).json(saveBrand);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllBrand: async (req, res) => {
    try {
      const Brands = await Brand.find();
      res.status(200).json(Brands);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAnBrand: async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      res.status(200).json(brand);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateBrand: async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      await brand.updateOne({ $set: req.body });
      res.status(200).json("Update successfuly !");
    } catch (error) {
      return res.status(500).json(err);
    }
  },

  deleteBrand: async (req, res) => {
    try {
      await Product.updateMany({ brand: req.params.id }, { brand: null });
      await Brand.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfuly!");
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = brandController;
