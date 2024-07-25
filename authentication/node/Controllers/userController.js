const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt=require("bcrypt")
const tokenkey = process.env.SECRETKEY
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

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




const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() +  10 * 60 * 1000; // 10 min 
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, 
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetUrl}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('Error in sending email: ', err);
        return res.status(500).send('Error in sending email');
      } else {
        console.log('Email sent: ', response);
        return res.status(200).json({ msg: 'Recovery email sent and link valid for 10 minutes' });
      }
    });
  } catch (err) {
    console.error('Server error: ', err.message);
    return res.status(500).send('Server error');
  }
};







const resetPassword = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log('Password has been reset for user:', user.email);
    return res.status(200).json({ msg: 'Password has been reset' });
  } catch (err) {
    console.error('Server error: ', err.message);
    return res.status(500).send('Server error');
  }
};








module.exports = { registerUser ,loginUser,forgotPassword,resetPassword} 
