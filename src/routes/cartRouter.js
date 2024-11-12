const express = require("express");
const { findById } = require("../models/cartSchema");
const Product = require("../models/productSchema");
const cartRouter = express.Router();

cartRouter.post('/addtoCart/:id',async(req,res)=>{
    try{
          const {id} = req.params;
          const product = await Product.findById(id);
          if(!product){
            return res.status(500).send("Please add valid Product in the Cart");
          }
          
          //user ref to logged in user

    }
    catch(err){
        res.status(404).send("Add to Cart");
    }
})

