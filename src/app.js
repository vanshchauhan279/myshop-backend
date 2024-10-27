const express = require('express');
const connectDB = require("./config/database")
const app= express();
const PORT=4000

app.get('/',(req,res)=>{
    res.send("HI I am here")
})


app.listen(PORT,()=>{

  connectDB()
    .then(()=>{
        console.log("Database connection is established");
        console.log(`server is listening at port ${PORT}`)
    })
    .catch(()=>{
        console.log("Databse is not connected");
    })
    

}); 