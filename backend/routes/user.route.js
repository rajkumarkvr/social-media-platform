const express = require("express");
const checkValidId=require("../middlewares/checkValidId.js")
const router = express.Router();
const UserModel = require("../models/user.model.js");
const {isValidObjectId}=require("mongoose");
router.post("/profile",async (req,res)=>{

    try {
        
        const userId=req.body.id;
        if(!isValidObjectId(userId)){
            return res.status(400).json({error:"Oops!User Not Found"});
        }
        if(userId){
            const response=await UserModel.findById({_id:userId});
            if(!response)return res.status(400).json({error:"Oops!User Not Found"});
            return res.json({response});
        
        }
        return res.status(400).json({error:"Oops!User Not Found"});
        
    } catch (error) {
        console.log(error.message);
    }

});
module.exports=router