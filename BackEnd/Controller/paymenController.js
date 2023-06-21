const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "YOUR_CLIENT_ID",
  client_secret: "YOUR_CLIENT_SECRET",
});

const createPayment = async (req, res) => {
  const { amount, currency } = req.body;

  const paymentData = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          total: amount.toString(),
          currency,
        },
      },
    ],
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    },
  };

  try {
    const createPayment = await new Promise((resolve, reject) => {
      paypal.payment.create(paymentData, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });

    // Redirect user to PayPal for payment approval
    res.redirect(
      createPayment.links.find((link) => link.rel === "approval_url").href
    );
  } catch (error) {
    console.log("Error", error);
    res.status(500).json(error);
  }
};

const executePayment = async (req, res) => {
  const { paymentId, payerId } = req.query;

  try {
    const executePayment = await new Promise((resolve, reject) => {
      paypal.payment.execute(
        paymentId,
        { payer_id: payerId },
        (error, payment) => {
          if (error) {
            reject(error);
          } else {
            resolve(payment);
          }
        }
      );
    });

    // Payment executed successfully
    res
      .status(200)
      .json({ message: "Payment successful", payment: executePayment });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json(error);
  }
};

module.exports = {
  createPayment,
  executePayment,
};
