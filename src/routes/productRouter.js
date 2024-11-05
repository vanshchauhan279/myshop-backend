const express = require("express");
const productRouter = express.Router();
const fs = require("fs");
const csv = require("csv-parser");
const Product = require("../models/productSchema");
const path = require('path');


productRouter.post("/body", async (req, res) => {

  const csvPath = path.resolve(__dirname, '../utils/fashionDataset.csv');
  
  try {
    const products = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        products.push(row);
      })
      .on("end", async() => {
        try{
           await Product.insertMany(products)
           res.send("Data Imported Successfully")
        }
        catch(err){
            res.status(404).send(err);
        }
       
      });
  } catch (err) {
       res.status(404).send(err);
  }
});

module.exports = productRouter;
  
