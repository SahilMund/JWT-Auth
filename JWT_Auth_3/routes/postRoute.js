
const router=require("express").Router();
const verified=require("../middleware/verifyToken");

router.get('/getall',verified, (req,res) => {
     res.json(req.user);
     });


module.exports=router;