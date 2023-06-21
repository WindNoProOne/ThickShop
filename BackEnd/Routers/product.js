const router = require("express").Router();
const productController = require("../Controller/productController");

router.post("/", productController.addproduct);

router.get("/", productController.getAllProduct);

router.get("/:id", productController.getAnProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
