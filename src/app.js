const express = require('express');
const connectDB = require("./config/database");
const userRouter = require('./routes/userRouter');
const cookieParser = require("cookie-parser")
const productRouter = require("./routes/productRouter");

const app= express();
const PORT=4000

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use('/',userRouter,productRouter);


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