const mongoose = require("mongoose");

const {Schema} = mongoose;

const productSchema = new Schema({
    Img: {
        type: String,
        default: '../Images/defaultImage.png'
    },
    BrandName: {
        type: String,
    },
    Details: {
        type: String,
    },
    Sizes: {
        type: String,
    },
    MRP: {
        type: String,
    },
    SellPrice: {
        type: String,
    },
    Discount: {
        type: String,
    },
    Category: {
        type: String,
    }
})

const Product = mongoose.model('product',productSchema);
module.exports = Product;