const express = require("express");
const User = require("../models/userSchema");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const validation = require("../utils/Validation");


userRouter.post("/signup",async(req,res)=>{

       validation(req.body);
       

})
userRouter.post("/login", async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ gmail: mail }).exec();

    // if (!user) {
    //   return res.status(401).send("Invalid Credentials");
    // }

    const token = jwt.sign({ _id: user._id }, "MYSTORE12345");
    res.cookie(token);
    console.log(token);

    res.send("User logged IN");
  } catch (err) {
    console.log("error: ", err);
    res.status(401).send("You cannot logged In ", err);
  }
});

module.exports = userRouter;
