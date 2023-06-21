const router = require("express").Router();
const homeController = require("../Controller/homeController");

router.post("/", homeController.addHome);

router.get("/", homeController.getAllHome);

router.get("/:id", homeController.getAnHome);

router.put("/:id", homeController.updateHome);

router.delete("/:id", homeController.deleteHome);

module.exports = router;
