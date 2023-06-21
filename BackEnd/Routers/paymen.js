const router = require("express").Router();

const createPayment = require("../Controller/paymenController");
const executePayment = require("../Controller/paymenController");

router.post("/payment/create", paymentController.createPayment);
router.get("/payment/execute", paymentController.executePayment);

module.exports = router;
