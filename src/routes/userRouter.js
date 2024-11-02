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
    res.cookie(token);

    res.send("User is added", user);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});



module.exports = userRouter;
