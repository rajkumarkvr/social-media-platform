const mongoose =require("mongoose");

const commentSchema=new mongoose.Schema({
    commentContent:{type:String},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"Users"}],
    commentedBy:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
    replies:[{type:mongoose.Schema.Types.ObjectId,ref:"Replies",ref:"Users"}],
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"Posts"}
},{
    timestamps:true,versionKey:false
});

module.exports=mongoose.model("Comments",commentSchema);