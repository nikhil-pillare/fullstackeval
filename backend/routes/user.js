const express= require("express");
const {UserModel} = require('../models/userModel');
const jwt= require("jsonwebtoken");
const bcrypt= require('bcrypt');
require("dotenv").config();
const auth= require("../auth/auth.middleware")
const userRouter=express.Router();

userRouter.post("/register", async(req,res)=>{
    const {email, password, name, gender,age,city, is_married}= req.body;

    try {
        bcrypt.hash(password, 5, async (err, hash)=> {
            if(err){
                console.log(err)
            }else{
                const user =new UserModel({
                    email, password:hash, name, gender,age,city, is_married  
                });
                await user.save();
                res.send({"msg":"User registered!!"})
            }
        });
    } catch (error) {
        res.send({"msg":"error in register"})
    }
})

userRouter.post("/login", async (req,res)=>{
    const {email, password}= req.body;
    try {
        const user = await UserModel.find({email});
        const hashed= user[0].password;
        if(user.length>0){
            bcrypt.compare(password, hashed, (err, result)=> {
                if(result){
                    const token= jwt.sign({userId: user[0]._id}, process.env.key);
                    res.send({"msg":"login successfull",token})
                }else{
                    res.send({"msg":"Invalid credentials"})
                }
            });
        }else{
            res.send({"msg":"error in login"})
        }
    } catch (error) {
        res.send({"msg":"wrong credentials"})
    }
})

module.exports=
    userRouter
