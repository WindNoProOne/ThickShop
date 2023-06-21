const router = require("express").Router();
const feetbackController = require("../Controller/feetbackController");

router.post("/", feetbackController.addFeetback);

router.get("/", feetbackController.getAllFeetback);

router.get("/:id", feetbackController.getAnFeetback);

router.put("/:id", feetbackController.updateFeetBack);

router.delete("/:id", feetbackController.deleteFeetBack);

module.exports = router;
