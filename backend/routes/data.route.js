const express = require("express");
const router = express.Router();
const authenticateToken=require("../middlewares/auth.middleare.js");
router.get("/data",authenticateToken,(req,res)=>{
    res.status(200).json({data:"20000rs",user:req.user});
});
module.exports=router;