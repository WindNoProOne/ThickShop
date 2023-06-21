const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

const authRouter = require("./Routers/auth");
const userRouter = require("./Routers/user");
const brandRouter = require("./Routers/brand");
const productRouter = require("./Routers/product");
const cartRouter = require("./Routers/cart");
const homeRouter = require("./Routers/home");
const newRouter = require("./Routers/new");
const feetbackRouter = require("./Routers/feetBack");

dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Server connected successfully");
  })
  .catch(() => {
    console.log("Filed !");
  });

app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/brand", brandRouter);
app.use("/v1/product", productRouter);
app.use("/v1/cart", cartRouter);
app.use("/v1/home", homeRouter);
app.use("/v1/news", newRouter);
app.use("/v1/feetback", feetbackRouter);

app.listen(8000, () => {
  console.log("Server Is running");
});
