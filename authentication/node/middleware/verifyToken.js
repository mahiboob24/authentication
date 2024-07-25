const jwt = require('jsonwebtoken')
require("dotenv").config()
const tokenkey =process.env.SECRETKEY


function verifyToken(req, res, next) {
    const token=req.header('Authorization')
    if (!token) {
       return res.status(403).send("invalid token!!")
    } 
    try{
        const usertoken=jwt.verify(token,tokenkey)
        req.user=usertoken
    }catch{
        res.status(403).send("please check tokenkey!!")
    }
   return next()
   
}


module.exports = verifyToken