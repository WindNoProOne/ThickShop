const { Home } = require("../Models/User.js");

const homeController = {
  addHome: async (req, res) => {
    try {
      const newHome = new Home(req.body);
      const saveHome = await newHome.save();
      res.status(200).json(saveHome);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllHome: async (req, res) => {
    try {
      const Homes = await Home.find();
      res.status(200).json(Homes);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAnHome: async (req, res) => {
    try {
      const home = await Home.findById(req.params.id);
      res.status(200).json(home);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateHome: async (req, res) => {
    try {
      const home = await Home.findById(req.params.id);
      await home.updateOne({ $set: req.body });
      res.status(200).json("Update successfuly !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteHome: async (req, res) => {
    try {
      await Home.updateMany({ home: req.params.id }, { home: null });
      await Home.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfuly!");
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = homeController;
