const UserModel = require("../Model/UserModel");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const salt = 10;

// ****************** Registration Controller ***************
// ******************** User Registration *******************

const RegisterController = async (req, res) => {
    const { fullName, email, phone, password, address,isSeller,gender } = req.body;
    try {
        if (!fullName) {
            res.json({ success: false, message: "Enter Full Name" });
        }
        if (!email) {
            res.json({ success: false, message: "Enter Email" });
        }
        if (!phone) {
            res.json({ success: false, message: "Enter Phone" });
        }
        if (!password) {
            res.json({ success: false, message: "Enter Password" });
        }
        if (!address) {
            res.json({ success: false, message: "Enter Address" });
        }
        if (!gender) {
            res.json({ success: false, message: "Enter Gender" });
        }
        const userExist = await UserModel.findOne({ email , phone });
        if (userExist) {
            res.json({ success: false, message: "User Already Exist" });
        }
        else {
            const hashedPwd =  bcrypt.hashSync(password, salt);
            const fetchData = await UserModel.create({ fullName, email, password: hashedPwd, phone, address,isSeller,gender });
            res.json({ success: true, message: "Registration Successful", fetchData });       
        }
            
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in Register controller"+error})
    }
}


// *********************** Login COntroller ******************
// *******************************User Login*********************

const LoginController = async (req, res) => {
    const { email, password,isSeller } = req.body;
    try {
        if (!email) {
            res.json({success:false,message:"Email is Required"})
        }
        if (!password) {
            res.json({success:false,message:"Password is Required"})
        }
        const fetchData = await UserModel.findOne({ email });
        if (!fetchData) {
            res.json({success:false,message:"No user Found with this email"})
        }
        else {
            const passwordMatch = bcrypt.compareSync(password,fetchData.password);
            if (passwordMatch) {
                const token= JWT.sign({_id:fetchData._id,email:fetchData.email,phone:fetchData.phone,name:fetchData.fullName,isSeller:fetchData.isSeller},process.env.JWT_SECRET,{ expiresIn: '3d' })
                res.json({success:true,message:"User Authenticated",fetchData,token})
            }
            else {
                res.json({success:false,message:"Invalid Password"})
            }
        }
       
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in login controller",error})
    }
}

module.exports = { LoginController,RegisterController };