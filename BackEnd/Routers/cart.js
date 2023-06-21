const cartProduct = require("../Controller/cartController");
const router = require("express").Router();

router.post("/", cartProduct.addProductToCart);

router.put("/update/", cartProduct.updateCart);

router.get("/view", cartProduct.viewCart);

router.delete("/delete", cartProduct.deleteCart);

module.exports = router;
