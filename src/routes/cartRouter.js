const express = require("express");
const Product = require("../models/productSchema");
const User = require("../models/userSchema");
const profileAuth = require("../middleWare/profileAuth");
const Cart = require("../models/cartSchema");
const cartRouter = express.Router();

cartRouter.post("/addtoCart/:id", profileAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Logged In Failed");
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send("Please add valid Product in the Cart");
    }

    const isProductInCart = await Cart.findOne({
      product: product._id,
      user: user._id,
    });
    if (isProductInCart) {
      return res.status(404).send("Product is already present");
    }

    const cart = await Cart.create({
      product: product,
      user: user,
    });
    res.send(cart);
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.get("/cart", profileAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await Cart.find({ user: userId });
    res.send(cartItems);
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.delete("/removeFromCart/:id", profileAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const cartItem = await Cart.findOne({ user: userId, _id: id });

    if (!cartItem) {
      return res.status(404).send("Item is not present is cart");
    }

    const newCart = await Cart.deleteOne(cartItem);

    res.send("Succesfully deleted from cart");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = cartRouter;
