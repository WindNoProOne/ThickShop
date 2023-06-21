const router = require("express").Router();
const newController = require("../Controller/newController");

router.post("/", newController.addNew);

router.get("/", newController.getAllNew);

router.get("/:id", newController.getAnNew);

router.put("/:id", newController.updateNew);

router.delete("/:id", newController.deleteNew);

module.exports = router;
