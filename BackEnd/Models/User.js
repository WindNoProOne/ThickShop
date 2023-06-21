const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    avata: {
      type: String,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { timestamps: true }
);

const brandSchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  size: {
    type: [String],
  },
  material: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  image: {
    type: String,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  createdAt: { type: Date, default: Date.now },
});

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentId: { type: String },
  status: {
    type: String,
    enum: ["created", "approved", "completed", "failed"],
    default: "created",
  },
  createdAt: { type: Date, default: Date.now },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const homeSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const newSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

let User = mongoose.model("User", userSchema);
let Brand = mongoose.model("Brand", brandSchema);
let Product = mongoose.model("Product", productSchema);
let Payment = mongoose.model("Payment", paymentSchema);
let Cart = mongoose.model("Cart", cartSchema);
let Home = mongoose.model("Home", homeSchema);
let New = mongoose.model("New", newSchema);
let Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { Brand, User, Product, Payment, Cart, Home, New, Feedback };
