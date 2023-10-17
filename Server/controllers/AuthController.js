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
        res.status(400).json({ success: false, message: "Error in Registering User", error })
    }

}

exports.updateUserController = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id,{...req.body},{new:true})
        res.status(200).json({success:true,message:"User Updated Successfully",user})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,message:"Unexpected Error Occured While Updating User"})
    }
}