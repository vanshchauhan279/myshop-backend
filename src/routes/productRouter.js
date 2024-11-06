const express = require("express");
const productRouter = express.Router();
const fs = require("fs");
const csv = require("csv-parser");
const Product = require("../models/productSchema");
const path = require("path");


// we have to write middleware for route restricted to developer of company
productRouter.post("/products", async (req, res) => {
  try {
    const csvPath = path.resolve(__dirname, "../utils/fashionDataset.csv");
    const products = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        const productData = {
            BrandName: row['BrandName'],
            Details: row['Details'],
            Sizes: row['Sizes'],
            MRP: row['MRP'],
            SellPrice: row['SellPrice'],
            Discount: row['Discount'],
            Category: row['Category']
        }
        products.push(productData);
      }) 
      .on("end", async () => {
        try {
         const mainObj = {products: products}
          await Product.insertMany(mainObj.products);
          res.send("Data Imported Successfully");
        } catch (err) {
          res.status(404).send(err);
        }
      });
  } catch (err) {
    res.status(404).send(err);
  }
});

productRouter.get("/products", async(req,res)=>{
    try{
         const productObj = await Product.find({});
         res.send(productObj);
    }
    catch(err){
        res.status(404).send(err)
    }
})

module.exports = productRouter;
