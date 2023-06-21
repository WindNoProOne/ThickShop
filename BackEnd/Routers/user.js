const middlewareController = require("../Controller/middlewareController");
const userController = require("../Controller/userController");

const router = require("express").Router();

//Get ALL User
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

//Delet Users
router.delete(
  "/delete/:id",
  middlewareController.verifyTokenAndAdmiAuth,
  userController.deleteUser
);

module.exports = router;
