const express = require('express');
const app= express();
const PORT=4000

app.get('/',(req,res)=>{
    console.log("hello World")
    res.send("Hello World")
})

app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`)

});