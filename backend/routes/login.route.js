const express = require("express");
const mongoose = require("mongoose");
const bcrypt =require("bcrypt");
const generateToken = require("../services/authService.js");
const UserModel = require("../models/user.model.js");
const router = express.Router();
String.prototype.isValidEmail = function () {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(this);
};

router.post("/login", async (req, res) => {
  
    try {
    const username = req.body.username;
    const password = req.body.password;
    
      if(username.isValidEmail()){
        const user=await UserModel.findOne({email:username});
        if(!user)return res.status(401).json({ username:"username",error: "Email not found!"});
        const isValidPassword=await bcrypt.compare(password,user.password)
        if(isValidPassword){
          let token=await generateToken(user)
          return res.status(200).json({token:token,userInfo:{
            id:user._id,
            name:user.name,
            username:user.username,
            gender:user.gender,
            profilePic:user.userProfile
          }})
        }
        else{
          return res.status(401).json({password:"password", error: "Invalid password"});
      }
      }
    else{
    const user=await UserModel.findOne({username:username});
    if(!user)return res.status(401).json({ username:"username", error: "username not found!"});
    const isValidPassword=await bcrypt.compare(password,user.password)
    if(isValidPassword){
        let token=await generateToken(user)
        return res.status(200).json({token:token,userInfo:{
          id:user._id,
          name:user.name,
          username:user.username,
          gender:user.gender,
          profilePic:user.userProfile
        }})
    }
    else{
        return res.status(401).json({ password:"password",error:"Invalid password"});
    }
  } 
  }catch (error) {
    res.status(500).json({ error: error.message });
  }

});
module.exports=router;