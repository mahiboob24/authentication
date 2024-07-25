const mongoose=require('mongoose')

const userSchema=new mongoose.Schema([{
    name:{type:String},
    email:{type:String},
    password:{type:String},
    token:{type:String},
    resetPasswordToken: String,
    resetPasswordExpires: Date
}])

const newwUser=mongoose.model('User',userSchema)
module.exports=newwUser


