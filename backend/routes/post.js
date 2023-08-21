const express =require("express");
const PostModel = require("../models/postModel");
const auth= require("../auth/auth.middleware")

const postRouter= express.Router();

postRouter.get("/", async (req,res)=>{
    try {
        const {title, body, device , no_of_comments}= req.query;
        if(device){
            query.device= device;
        }
        const posts = await PostModel.find(query);
        res.status(200).send(posts)

    } catch (error) {
        console.log(error)
        res.status(200).send({"msg":"404 error"})
    }
})

postRouter.post("/add", async (req,res)=>{
    const payload= req.body;
    try {
        const newPost= new PostModel(payload);
        await newPost.save();
        res.send({"msg":"post created"})
    } catch (error) {
        console.log(error);
        res.send({"err":"something went wrong"})
    }
})

postRouter.patch("/update/:id", async (req,res)=>{
    const payload= req.body;
    const id= req.params.id;
    const post = await PostModel.findOne({_id: id});
    try {
        if(post.userId !==req.body.userId){
            res.send({"msg":"not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({
                _id:id, payload
            });
            res.send({"msg":"updated"})
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})

postRouter.delete("/delete/:id", async (req,res)=>{
   
    const id= req.params.id;
    const post = await PostModel.findOne({_id: id});

    try {
        if(post.userId !==req.body.userId){
            res.send({"msg":"not authorized"})
        }else{
            await PostModel.findByIdAndDelete({
                _id:id
            });
            res.send({"msg":"updated"})
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"something went wrong"})
    }
})


module.exports= 
    postRouter
