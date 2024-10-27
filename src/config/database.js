const mongoose = require('mongoose');

const connectDB = async()=>{
   await mongoose.connect('mongodb+srv://vansh2125csai1032:5OlcvJejrROoit4F@mystore.ggqrigp.mongodb.net/')
}

module.exports = connectDB;