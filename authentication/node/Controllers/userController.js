const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt=require("bcrypt")
const tokenkey = process.env.SECRETKEY





const registerUser  = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const bcryptpassword=await bcrypt.hash(password,10)
    let user = new User({ name, email,password:bcryptpassword });

    // let token = jwt.sign({ user }, tokenkey, { expiresIn: '1h' })//here payload=user key=securekey 
    // user.token=token

    user = await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

}

const loginUser=async(req,res)=>{
  const{email,password}=req.body
  try{
    if(!(email && password)){
      console.log('check your email and password')
      res.status(400).json('check your email and password')
    }
    const user=await User.findOne({email})
    if(user &&(await bcrypt.compare(password,user.password))){

      let token=jwt.sign({user},tokenkey,{expiresIn:'120ms'})
      // user.token=token
      console.log('Generated Token:', token);
      res.status(200).json({user,token,message:"logged in successfully!!!"})
    }
  
  }catch{
res.status(500).json({  message:"server error!!"})
}
}


module.exports = { registerUser ,loginUser} 
