const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter=require("./routes/userRoutes");
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')
const morgan = require('morgan')
const path=require('path')
const app = express()
dotenv.config();
connectDB()
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(cookieParser())
app.use(express.json())
app.use("/api/user", userRouter)
app.use(express.static(path.join(__dirname, './build')))
app.get('*', function (req,res) {
    res.sendFile(path.join(__dirname,'./build/index.html'))
})
const PORT=process.env.PORT
app.listen(PORT,()=>console.log("app started listening"))