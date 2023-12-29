const mongoose =require("mongoose");

const replySchema=new mongoose.Schema({
    replyContent:{type:String},
    repliedBy:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
    commentId:{type:mongoose.Schema.Types.ObjectId,ref:"Comments"}
});

module.exports=mongoose.model("Replies",replySchema);