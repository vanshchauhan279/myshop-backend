const mongoose = require('mongoose');
const {Schema} = mongoose;
var validator = require("validator")

const userSchema = new Schema({
    name: {
        type: String,
        minLength: 4,
        maxLength: 50,
        required: true
    },
    gmail: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Email is not valid")
        }
        }
    },
    phoneNum: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})
