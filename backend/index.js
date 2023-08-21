const express= require("express");
const connection = require("./db")

const userRouter =require("./routes/user");
const postRouter = require("./routes/post");
const {auth}=require('./auth/auth.middleware');
const { default: mongoose } = require("mongoose");

require("dotenv").config();
const app=express()

app.use(express.json());

app.get("/", (req,res)=>{
    res.send({"msg":"welcome to InstaMasai"})
})

app.use("/users", userRouter);

app.use("/posts",auth, postRouter);

app.listen(process.env.PORT, async ()=>{
    console.log(`running at ${process.env.PORT}`)
    try {
        await connection
        console.log(connection)
        console.log("connection succesfull")
    } catch (error) {
        console.log(error)
    }
    
})
