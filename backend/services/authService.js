const jwt=require("jsonwebtoken");

const generateToken=async(userInfo)=>{
    const payLoad={
        id:userInfo._id,
        name:userInfo.name,
        username:userInfo.username
    }
    const expiresIn="10hr"
    const token=await jwt.sign(payLoad,process.env.SECRET_KEY,{expiresIn:expiresIn})
    
    return token
}

module.exports=generateToken;