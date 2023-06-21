const { Cart, User, Product } = require("../Models/User");

const cartProduct = {
  addProductToCart: async (req, res) => {
    try {
      const productId = req.body.products;
      const userId = req.body.user;
      // Kiểm tra nếu người dùng tồn tại
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Kiểm tra nếu sản phẩm tồn tại
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      // Kiểm tra nếu giỏ hàng đã tồn tại cho người dùng
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        // Giỏ hàng chưa tồn tại, tạo giỏ hàng mới
        cart = new Cart({
          user: userId,
          products: [{ product: productId, quantity: 1 }],
        });
      } else {
        // Giỏ hàng đã tồn tại, kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const productIndex = cart.products.findIndex(
          (item) => item.product.toString() === productId
        );
        if (productIndex !== -1) {
          // Sản phẩm đã tồn tại trong giỏ hàng, chỉ cập nhật số lượng
          cart.products[productIndex].quantity += 1;
        } else {
          // Sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào danh sách
          cart.products.push({ product: productId, quantity: 1 });
        }
      }
      // Tính toán giá trị total của giỏ hàng
      let total = 0;
      for (const item of cart.products) {
        const product = await Product.findById(item.product);
        total += item.quantity * product.price;
      }
      cart.total = total;
      // Lưu giỏ hàng
      await cart.save();
      return res.status(200).json(cart);
    } catch (error) {
      console.log("Error", error);
      res.status(500).json(error);
    }
  },

  updateCart: async (req, res) => {
    try {
      const { quantity } = req.body;
      const productId = req.body.products;
      const userId = req.body.user;

      // Kiểm tra nếu giỏ hàng tồn tại cho người dùng
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        // Giỏ hàng không tồn tại, tạo mới
        cart = new Cart({
          user: userId,
          products: [{ product: productId, quantity }],
        });
      } else {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const productIndex = cart.products.findIndex(
          (item) => item.product.toString() === productId
        );
        if (productIndex === -1) {
          // Sản phẩm không tồn tại trong giỏ hàng, thêm mới
          cart.products.push({ product: productId, quantity });
        } else {
          // Cập nhật số lượng sản phẩm trong giỏ hàng
          cart.products[productIndex].quantity = quantity;
        }
      }

      // Tính toán lại tổng tiền trong giỏ hàng
      let total = 0;
      for (const item of cart.products) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        total += item.quantity * product.price;
      }
      cart.total = total;

      // Lưu giỏ hàng sau khi cập nhật
      await cart.save();

      return res.status(200).json(cart);
    } catch (error) {
      console.log("Error", error);
      res.status(500).json(error);
    }
  },

  viewCart: async (req, res) => {
    try {
      const userId = req.body.user;
      // Kiểm tra nếu người dùng tồn tại
      const cart = await Cart.findOne({ user: userId }).populate(
        "products.product"
      );

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      return res.status(200).json(cart);
    } catch (error) {
      console.log("Error", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteCart: async (req, res) => {
    try {
      const userId = req.body.user;
      const productId = req.body.products;
      // Kiểm tra nếu giỏ hàng tồn tại cho người dùng
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
      // Xóa sản phẩm khỏi danh sách sản phẩm trong giỏ hàng
      cart.products.splice(productIndex, 1);

      // Lưu giỏ hàng sau khi xóa sản phẩm
      await cart.save();
      return res
        .status(200)
        .json({ message: "Product removed from cart successfully" });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json(error);
    }
  },
};

module.exports = cartProduct;
