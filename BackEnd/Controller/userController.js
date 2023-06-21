const { User } = require("../Models/User.js");

/**
 * @param getAllUsers: View All User
 * @param deleteUser: Delete User
 */
const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = User.findOneAndDelete(req.params.id);
      return res.status(200).json("Delete Successfully (Đã xóa thành công)");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = userController;
