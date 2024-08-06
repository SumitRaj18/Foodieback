const express= require('express')
const router= express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt= require('jsonwebtoken')
var bcrypt = require('bcryptjs');
const jwtSecret= "What is my name"
router.post("/createuser",[
 body('email').isEmail(),
 body('password','Incorrect Password').isLength({min:5})
],async(req,res)=> {
    console.log(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.location
    )
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var salt = await bcrypt.genSaltSync(10);
    let secPassword= await bcrypt.hash(req.body.password, salt)
 try {
     await User.create( {
        name:req.body.name,
        email:req.body.email,
        password:secPassword,
        location:req.body.location
     }
    ).then(res.json({success:true}))
 } catch (error) {
     console.log(error)
     (res.json({success:false}))
 }
})


router.post("/loginuser",[
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})
   ],
   async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email=req.body.email;
    try{
        let userdata = await User.findOne({email});
        if(!userdata) {
            return res.status(400).json({error: "Incorrect Credentials"})
        }
        const pwdCompare= await bcrypt.compare(req.body.password, userdata.password)
        if(!pwdCompare) {
            return res.status(400).json({error: "Incorrect Credentials"})

        }
        const data= {
            user: {
                id: userdata.id
            }
        }
        const authtoken =jwt.sign(data,jwtSecret)
        return res.json({success:true,authtoken})
    }
     
    catch (error) {
        console.log(error)
        (res.json({success:false}))
    }


   })
module.exports=router;