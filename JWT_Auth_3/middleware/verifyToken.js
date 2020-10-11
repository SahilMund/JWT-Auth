
const jwt=require('jsonwebtoken');
const { TOKEN_SECRET} = require('../config/key');

module.exports=function (req,res,next) {
 const token=req.header('auth-token');
 if (!token) return res.send('access denied');

 try{
     const verified=jwt.verify(token,TOKEN_SECRET);
     req.user=verified;
     next();
 }catch(err){
     res.send('invalid token');
 }}