const brandController = require("../Controller/brandController");
const middlewareController = require("../Controller/middlewareController");
const router = require("express").Router();

router.post("/", brandController.addBrand);
router.get("/", brandController.getAllBrand);
router.get(
  "/:id",
  middlewareController.verifyToken,
  brandController.getAnBrand
);
router.put(
  "/:id",
  middlewareController.verifyToken,
  brandController.updateBrand
);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  brandController.deleteBrand
);

module.exports = router;
