const router = require('express').Router();
const verify = require('../middleware/verifyToken');

// here in get router we call a middleware verify
router.get('/protected',verify,(req,res)=>{
    res.json(req.user)
    
});

module.exports = router;