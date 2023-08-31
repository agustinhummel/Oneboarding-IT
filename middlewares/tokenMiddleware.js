const jwt=require('jsonwebtoken');

function verifyToken(req,res,next){
    const authHeader=req.headers["authorization"];
    const token= authHeader && authHeader.split(" ")[1];
    if(token==null){
        return res.status(403).send('Acceso denegado');
    }
    jwt.verify(token,process.env.SECRET_TOKEN,(err,user)=>{
        if(err){
            return res.status(401).send('Proporciona un token válido');
        }
        req.user=user;
        next();
    });
}

module.exports=verifyToken;