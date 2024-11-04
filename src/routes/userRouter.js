const express = require("express");
const User = require("../models/userSchema");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const validation = require("../utils/Validation");
const bcrypt = require("bcrypt");

userRouter.post("/signup", async (req, res) => {
  try {
    validation(req);
    const { name, gmail, phoneNum, password, address } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      gmail,
      phoneNum,
      password: hashPassword,
      address,
    });
    const token = jwt.sign({ _id: user._id }, "MYSTORE12345");
    res.cookie("token",token);

    res.send("User is added", user);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { gmail, password } = req.body;

    const user = await User.findOne({ gmail: gmail }).exec();
    if (!user) {
      return res.status(401).send("No user found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).send("Check your credentials");
    }

    const token = jwt.sign({ _id: user._id }, "MYSTORE12345");
    res.cookie("token",token);

    res.send("User logged IN");
  } catch (err) {
    console.log("error: ", err);
    res.status(401).send("You cannot logged In ", err); 
  }
});

userRouter.post("/logout",(req,res)=>{
    res.clearCookie('token',null);
    res.send("Logout Successfully");
})

module.exports = userRouter;
 