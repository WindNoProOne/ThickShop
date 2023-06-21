const { Feedback } = require("../Models/User.js");

const feetbackController = {
  addFeetback: async (req, res) => {
    try {
      const newFeetback = new Feedback(req.body);
      const saveFeetback = await newFeetback.save();
      res.status(200).json(saveFeetback);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllFeetback: async (req, res) => {
    try {
      const Feetbacks = await Feedback.find();
      res.status(200).json(Feetbacks);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAnFeetback: async (req, res) => {
    try {
      const feetback = await Feedback.findById(req.params.id);
      res.status(200).json(feetback);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateFeetBack: async (req, res) => {
    try {
      const feetback = await Feedback.findById(req.params.id);
      await feetback.updateOne({ $set: req.body });
      res.status(200).json("Update successfuly !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteFeetBack: async (req, res) => {
    try {
      await Feedback.updateMany({ home: req.params.id }, { home: null });
      await Feedback.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfuly!");
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = feetbackController;
