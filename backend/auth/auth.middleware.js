const jwt = require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token= req.headers.authorization;
    if(token){
        const decoded= jwt.verify(token.split(" ")[1]);
        try {
            if(decoded){
                req.body.userId= decoded.userId;
                req.body.user= decoded.user;
                next();
            }else{
                res.send({"msg":"please login"})
            }
        } catch (error) {
            res.send({"err":error})
        }
    }else{
        res.send({"msg":"please login"})
    }
}

module.exports={
    auth
}