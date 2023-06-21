const jwt = require("jsonwebtoken");
const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
        if (error) {
          return res.status(403).json("Token is not valid (Token đã hết hạn)");
        }
        req.user = user;
        next();
      });
    } else {
      return res
        .status(401)
        .json(
          "You're not authenticated (Chưa xác thực token nên không vào được)"
        );
    }
  },

  //verifyTokenAndAdmiAuth: Xác thực để xóa dữ liệu user
  verifyTokenAndAdmiAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res
          .status(403)
          .json(
            "You're not allowed to Delete Other (Bạn không phải là admin nên không xóa được user)"
          );
      }
    });
  },
};

module.exports = middlewareController;
