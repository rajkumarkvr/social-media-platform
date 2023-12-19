const express = require("express");
const bcrypt =require("bcrypt");
const UserModel = require("../models/user.model.js")
const router=express.Router();

router.post("/register",async(req,res)=>{
    const userData=req.body;
    userData.password=await bcrypt.hash(userData.password,10);
    try{
       const response = await UserModel.create(userData);

       res.status(201).json(response);
    }catch(error){
        return res.status(400).json({error});
    }
});

module.exports=router;