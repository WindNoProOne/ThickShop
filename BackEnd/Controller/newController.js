const { New } = require("../Models/User.js");

const newController = {
  addNew: async (req, res) => {
    try {
      const newNew = new Brand(req.body);
      const saveNew = await newNew.save();
      res.status(200).json(saveNew);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllNew: async (req, res) => {
    try {
      const News = await New.find();
      res.status(200).json(News);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAnNew: async (req, res) => {
    try {
      const news = await New.findById(req.params.id);
      res.status(200).json(news);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateNew: async (req, res) => {
    try {
      const news = await New.findById(req.params.id);
      await news.updateOne({ $set: req.body });
      res.status(200).json("Update successfuly !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteNew: async (req, res) => {
    try {
      await New.updateMany({ new: req.params.id }, { new: null });
      await New.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfuly!");
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = newController;
