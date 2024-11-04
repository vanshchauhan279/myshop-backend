const mongoose = require("mongoose");

const {Schema} = mongoose;

const productSchema = new Schema({
    p_Img: {
        type: String,
        default: '/Images/defaultImage.png'
    },
    brandName: {
        type: String,
    },
    p_Detail: {
        type: String,
    },
    p_Sizes: {
        type: String,
    },
    p_MRP: {
        type: Number,
    },
    p_SellPrice: {
        type: Number,
    },
    p_Discount: {
        type: String,
    },
    p_Category: {
        type: String,
    }
})


const Product = mongoose.model('product',productSchema);
module.exports = Product;