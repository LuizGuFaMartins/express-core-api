const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.headers?.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (!err) {
          req.usuario = decoded.user;
          return next();
        } else {
          res.status(401).json({ error: err });
        }
      });
    } else {
      res.status(401).json({ error: "Json Web Token not provide" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error });
  }
};
