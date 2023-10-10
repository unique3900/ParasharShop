const express = require('express');
const app = express();

exports.LoginController = async (req, res) => {
    const { email,password } = req.body;
    if (!email || !password) {
        res.status(401).json({success:false,message:"Email and Password is Required"})

    }
    else {
        res.status(201).json({success:true,message:"Login Sucessful"})
    }
}