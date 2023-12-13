const mongoose =require("mongoose");
const getDefaultProfile=require("../services/imageService")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true   
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    userProfile:{
        type:String,
        default:getDefaultProfile()
    }
},{
    timestamps:true,
});

module.exports=mongoose.model("Users",userSchema);