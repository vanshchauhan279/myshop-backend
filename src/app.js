const express = require('express');
const app= express();
const PORT=4000

app.get('/',(req,res)=>{
    console.log("hello World")
    res.send("HI")
})

app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`)

});