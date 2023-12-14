const jwt = require("jsonwebtoken");
const authenticateToken=(req,res,next)=>{

    const token = req.headers.authorization;
    if(token){
    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        if(err)return res.sendStatus(403);
        req.user=decode;
        next()
    })
    }
    else{
        res.sendStatus(401);
    }
    
}


module.exports=authenticateToken;