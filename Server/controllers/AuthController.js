const express = require('express');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const { sanitizeUser } = require('../Middleware/Auth');
const jwt = require('jsonwebtoken');
const app = express();

const SECRETKEY = "SECRET";
exports.LoginController = async (req, res) => {
    res.cookie('jwt',req.user.token,{expires: new Date(Date.now()+3600000),httpOnly:true})
    res.status(200).json({ success: true, user: req.user});
}

exports.CheckUser = async (req, res) => {
    res.json({success:'true',user:req.user});
}


exports.RegisterController = async (req, res) => {
    try {
        const { email } = req.body;
        const userExist = await User.findOne({ email});
        if (userExist) {
            console.log("Exist")
            res.status(401).json({success:false,message:"User Already Exist"})
        } else {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const users = await User.create({ ...req.body, password: hashedPassword });
            const token=jwt.sign(sanitizeUser(users),SECRETKEY)
            res.json({ success: true, message: "User Registration Successful", users: token })
            res.cookie('jwt',token,{expires: new Date(Date.now()+3600000),httpOnly:true})
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Error in Registering User", error })
    }
}

exports.updateUserController = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id,{...req.body},{new:true})
        res.status(200).json({success:true,message:"User Updated Successfully",user})
        
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Unexpected Error Occured While Updating User"})
    }
}
exports.changePasswordController = async (req, res) => {
    try {
        const { password, newPassword,id } = req.body;
        const query = await User.findById(id);
        const pwdCompare = bcrypt.compareSync(password,query.password);
        if (pwdCompare) {
            const hashedPassword=bcrypt.hashSync(newPassword, 10)
            const user = await User.findByIdAndUpdate(id, { password: hashedPassword  });
        res.status(200).json({success:true,message:"Password Changed Successfully",user})
        }
        else {
            res.status(401).json({success:false,message:"Invalid Old Password"}) 
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Unexpected error occured when changing password"}) 
    }
}

exports.getLoggedInDataController = async (req, res) => {
    try {
        const id  = req.user.id;
        const user = await User.findOne({ id });
        if (user) {
            res.status(200).json({success:true,message:"User Fetched Successfully",user})
        }
        else {
            res.status(401).json({success:false,message:"User Not Found"}) 
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Unexpected error occured when fetching logged in data"}) 
    }
}