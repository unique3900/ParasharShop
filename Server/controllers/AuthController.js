const express = require('express');
const { User } = require('../models/User');
const app = express();

exports.LoginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).json({success:false,message:"Email and Password is Required"})
    }
    else {
        const user = await User.findOne( {email} );
        if (!user) {
            res.status(401).json({success:false,message:"User Doesnot Exist"})
        }
        else {
            console.log(user.email)
            if (user.password === password) {
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
        console.log(req.body)
        const users = await User.create(req.body);
        res.json({success:true,message:"User Registration Successful",users})
    } catch (error) {
        res.status(400).json({ success: false, message: "Error in Registering User", error })
    }

}