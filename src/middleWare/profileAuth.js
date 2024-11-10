const jwt = require("jsonwebtoken");

const profileAuth = (req, res, next) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return res.status(401).send("Please login to continue");
    }

    jwt.verify(token, "MYSTORE12345");

    next();
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = profileAuth;