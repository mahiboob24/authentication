const express=require('express')


const verifyToken=require("../middleware/verifyToken")
const router=express.Router()
const {registerUser,loginUser}=require("../Controllers/userController")

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/protected",verifyToken,(req,res)=>{
    res.send("welcome to homepage")

})


module.exports=router