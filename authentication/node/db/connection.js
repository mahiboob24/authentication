
const mongoose=require('mongoose')

const connectDb=mongoose.connect("mongodb://127.0.0.1:27017/myApp-db")
.then(()=>console.log("connected to db"))
.catch((error)=>console.log(error))
















