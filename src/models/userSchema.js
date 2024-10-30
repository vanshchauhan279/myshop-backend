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
        required: true,
        validate(val){
            if(!validator.isStrongPassword(val)){
                throw new Error("Make strong password")
            }
        }
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        validate(val){
            if(!['Male','Female','Others'].includes(val)){
                throw new Error("Choose valid gender type")
            }
        }
    }
})

const user = mongoose.model('user',userSchema);

module.exports= user;