const express = require('express');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const app = express();

exports.LoginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).json({success:false,message:"Email and Password is Required"})
    }
    else {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({success:false,message:"User Doesnot Exist"})
        }
        else {
            
            if ( bcrypt.compareSync(password,user.password)) {
                res.status(200).json({success:true,message:"User Authenticated",user})
            }
            else {
                res.status(401).json({success:false,message:"Invalid Password"}) 
            }
        }

    }
}


exports.RegisterController = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const users = await User.create({...req.body,password:hashedPassword});
        res.json({success:true,message:"User Registration Successful",users})
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
        const { email } = req.body;
        const user = await User.findOne({ email });
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