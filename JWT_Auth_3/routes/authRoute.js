
const router=require("express").Router();
const User=require("../models/user");
const jwt= require('jsonwebtoken');
const { TOKEN_SECRET} = require('../config/key');
const { registervalidation,loginvalidation }=require("../validation");
const  bcrypt=require("bcryptjs");



router.post("/register",async (req,res) =>{

    const{ error }=registervalidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

//checking if the user is already in db

const emailExist= await User.findOne({email:req.body.email});
if(emailExist) return res.json('email already exist');

//hash password
const salt=await bcrypt.genSalt(10);
const hashPassword=await bcrypt.hash(req.body.password,salt);

//create a new user
    const userdata=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
   });
   try{
    const saveduser=await userdata.save();
     res.send(saveduser);
   } catch(err) {
            res.send(err);
        };

});
router.post('/login',async (req,res) => {
    //validation
 const{ error }=loginvalidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   //check email exist
   const user= await User.findOne({email:req.body.email});
   if(!user) return res.json('email is not found');
//password is correct
  const validPass=await bcrypt.compare(req.body.password,user.password);
  if(!validPass) return res.send('invalid password')

//create token
const token= jwt.sign({_id: user._id},TOKEN_SECRET);

res.header('auth-token',token).send(token);


}); 


module.exports=router;



