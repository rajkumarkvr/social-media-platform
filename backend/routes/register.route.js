const express = require("express");
const UserModel = require("../models/user.model.js")
const router=express.Router();

router.post("/register",async(req,res)=>{
    const userData=req.body;
    console.log(userData);
    try{
       const response = await UserModel.create(userData);

       res.status(201).json(response);
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});

module.exports=router;