const User = require("../models/userSchema")
const validator = require("validator")

const validation = (req)=>{
    const {name,gmail,phoneNum,password}= req.body;
    if(name.length<4 || name.length>50 || !name){
         throw new Error("Name should be less than 50 and greater then 4 alphabet")
    }
    else if(!validator.isEmail(gmail)){
        throw new Error("Please write a valid mail address");
    }
    else if(!validator.isMobilePhone(phoneNum)){
        throw new Error("Please write a valid mobile Number");
    }
    else if(!validator.isStrongPassword(password)){
            throw new Error("Password is not strong")  
        }
}

module.exports = validation;