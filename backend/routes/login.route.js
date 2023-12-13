const express = require("express");
const mongoose = require("mongoose");
const generateToken = require("../services/authService.js");
const UserModel = require("../models/user.model.js");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user=await UserModel.findOne({username:username});
    if(!user)return res.status(401).json({ error: "No user found"});
    if(user.password==password){
        let token=await generateToken(user)
        return res.status(200).json({token:token,userInfo:user})
    }
    else{
        return res.status(401).json({ error: "Invalid password"});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports=router;