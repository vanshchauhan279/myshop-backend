const jwt = require("jsonwebtoken");

const profileAuth = (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;

    if (!token) {
      return res.status(401).send("Please login to continue");
    }
    const loggedIn= jwt.verify(token, "MYSTORE12345");
    if(!loggedIn){
        return res.status(404).send("please login in");
    }
    next();
  } catch (err) {
    return res.status(404).send(err);
  }
};


module.exports = profileAuth;
