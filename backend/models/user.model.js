const mongoose =require("mongoose");
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
        default:"/images/userprofile.png"
    }
    ,
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"Posts"}],
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:"Posts"}]
},{
    timestamps:true,versionKey:false
});

module.exports=mongoose.model("Users",userSchema);