const {isValidObjectId}=require("mongoose");

const checkValidId=(req,res,next)=>{
    if(isValidObjectId(req.body.id)){
       next()
    }
    return res.status(400).json({error:"Oops!User Not Found"});
}
module.exports=checkValidId;