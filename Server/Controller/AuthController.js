const UserModel = require("../Model/UserModel");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const SellerModel = require("../Model/SellerModel");
const dotenv = require('dotenv').config();
const salt = 10;

// ****************** Registration Controller ***************
// ******************** User Registration *******************

const RegisterController = async (req, res) => {
    const { fullName, email, phone, password, address,gender } = req.body;
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
        if (!userExist) {
            const hashedPwd =  bcrypt.hashSync(password, salt);
            const fetchData = await UserModel.create({ fullName, email, password: hashedPwd, phone, address,gender });
            res.json({ success: true, message: "Registration Successful", fetchData });  
        }
        else {
            res.json({ success: false, message: "User Already Exist" });
            return
        }
            
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in Register controller"+error})
    }
}


// *********************** Login COntroller ******************
// *******************************User Login*********************

const LoginController = async (req, res) => {
    const { email, password } = req.body;
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
                const token= JWT.sign({_id:fetchData._id,email:fetchData.email,phone:fetchData.phone,name:fetchData.fullName},process.env.JWT_SECRET,{ expiresIn: '3d' })
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

// ==========Current user Controller=========================
// ====================== Use for route protection ==================
const currentUserController = async (req, res) => {
    try {
        const { _id,email } = req.body;
        const fetchData = await UserModel.findOne( {_id}).select("-password");
        res.json({success:true,message:"Current user fetched",fetchData,_id,email})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in current user controller",error})
    }
    
}

// ====================== Seller Registration ========================
// ==================================== Any buyer can signup to become a seller=========

const sellerRegisterController = async (req, res) => {
    try {
        const {_id,password,businessName,businessAddress} = req.body;
        if (!_id) {
        res.json({success:false,message:"Login to Procced"})
        }
        if (!businessName) {
            res.json({success:false,message:"Business Name is Required"})
        }
        if (!businessAddress) {
            res.json({success:false,message:"Business Address is Required"})
        }
        if (!password) {
            res.json({success:false,message:"Password is Required"})
        }
        else {
         
            const fetchData = await SellerModel.create({ data:_id,businessName,businessAddress, password: bcrypt.hashSync(password, 10)});
            res.json({success:true,fetchData})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in seller register controller"+error})
    }
}

module.exports = { LoginController,RegisterController,currentUserController,sellerRegisterController };