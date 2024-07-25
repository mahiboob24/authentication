const express=require('express')


const verifyToken=require("../middleware/verifyToken")
const router=express.Router()
const {registerUser,loginUser,forgotPassword,resetPassword}=require("../Controllers/userController")
const { check } = require('express-validator');



router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/protected",verifyToken,(req,res)=>{
    res.send("welcome to homepage")

})

// Route to request a password reset
router.post('/forgot-password', [ check('email', 'Please include a valid email').isEmail()], forgotPassword);
  
  // Route to reset password
  router.post('/reset-password/:token', [check('password', 'Password is required').isLength({ min: 6 })], resetPassword);

module.exports=router