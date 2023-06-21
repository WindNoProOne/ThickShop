const { User } = require("../Models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //Create New User
      const newUser = await User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //Save to Database
      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (error) {
      console.log(">>> Register", error);
      return res.status(500).json(error);
    }
  },

  generateaccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "360d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "360d" }
    );
  },

  //loginUser
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Wrong UserName (Sai tên đăng nhập)");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json("Wrong PassWord (Sai Passwod");
      }

      //Nếu đúng trả về đây
      if (user && validPassword) {
        let accessToken = authController.generateaccessToken(user);
        let refreshToken = authController.generateRefreshToken(user);

        refreshTokens.push(refreshToken);

        //Gán refressToken
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  requestRefreshToken: async (req, res) => {
    //Lấy refressToken Từ User
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json("You're not authenLicated(Không có token)");

    if (!refreshTokens.includes(refreshToken)) {
      return res
        .status(403)
        .json(
          "Refresh token is not valid (Token thông báo không hợp lệ || KHông có token)"
        );
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error, user) => {
      if (error) {
        console.log("Error requestRefreshToken", error);
      }

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //Create new accessToken, refresh token
      let newAccessToken = authController.generateaccessToken(user);
      let newRefreshToken = authController.generateaccessToken(user);
      //Thêm tooken mới vào
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  },

  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res
      .status(200)
      .json("Logout Sessucess!!! (Đăng xuất thành Công!!!)");
  },
};

module.exports = authController;
