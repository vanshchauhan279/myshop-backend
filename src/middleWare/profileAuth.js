const jwt = require("jsonwebtoken");
const User = require("../models/userSchema")

const profileAuth = async(req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;

    if (!token) {
      return res.status(401).send("Please login to continue");
    }
    const loggedIn= jwt.verify(token, "MYSTORE12345");
    const user = await User.findById(loggedIn._id);
    
    if(!user){
      res.status(500).send("please logged In");
    }
    req.user=user;
   
    next();
  } catch (err) {
    return res.status(404).send(err);
  }
};


module.exports = profileAuth;
