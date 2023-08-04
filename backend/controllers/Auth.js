const bcrypt=require('bcrypt');
const User = require('../models/User');
const { getToken } = require('../utils/getToken');

exports.signup = async(req, res) => {
  try{
    const { firstName, lastName, email, userName, password } = req.body;
    if(!firstName || !lastName || !email || !password || !userName){
      return res.status(400).json({
        message: 'Please provide all the required fields',
        success:false
      });
    }
    const emailExist = await User.findOne({email:email});
    if(emailExist){
      return res.status(400).json({
        message: 'User already Exist with this email id',
        success:false
      });
    }
    const userNameExist = await User.findOne({userName:userName});
    if(userNameExist){
      return res.status(400).json({
        message: 'User already Exist with this user name',
        success:false
      });
    }
    if(password.length < 6){
      return res.status(400).json({
        message: 'Please enter a password of minimum length 6',
        success:false
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName, 
      lastName, 
      email, 
      userName, 
      password:hashedPassword, 
      displayPicture:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })
    const token = await getToken(email, user);
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password
    return res.status(200).json({
      success:true,
      userToReturn,
      message:"User registered successfully"
    })
  } catch(err){
    console.log(e);
    return res.status(400).json({
      message: 'Error while registering user',
      success:false
    });
  }
}

exports.login = async(req, res) => {
  try{
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({
        message: 'Please provide email and password',
        success:false
      });
    }
    const exist = await User.findOne({email:email})
    if(!exist){
      return res.status(400).json({
        message: 'User not registered',
        success:false
      });
    }
    const isMatch = await bcrypt.compare(password, exist.password);
    if(!isMatch) {
      return res.status(403).json({
        success:false,
        message:"please enter correct password"
      })
    }
    const token = await getToken(exist.email, exist)
    const userToReturn = { ...exist.toJSON(), token };
    delete userToReturn.password
    return res.status(200).json({
      success:true,
      userToReturn,
      message:"User Loggedin successfully"
    })
  } catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"Error while Logging in!"
    })
  }
}