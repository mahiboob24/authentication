const mongoose=require('mongoose')

const userSchema=new mongoose.Schema([{
    name:{type:String},
    email:{type:String},
    password:{type:String},
    token:{type:String},
}])

const newwUser=mongoose.model('User',userSchema)
module.exports=newwUser


