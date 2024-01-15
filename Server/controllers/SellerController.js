const { Seller } = require("../models/Seller");
const bcrypt = require('bcrypt');

exports.registerSeller = async (req, res) => {
    try {
        const { id } = req.user;
        const sellerExist = await Seller.findOne({ user:id})
        if (sellerExist) {
            res.status(401).json({ success: false, message: "Seller Account already Exist Under this ID" });
        } else {
            const hashedPassword = await bcrypt.hashSync(req.body.businessPassword, 10);
            const seller = await (await Seller.create({user:id,...req.body,businessPassword:hashedPassword})).populate("user")
            res.status(200).json({ success: true, message: "Seller Registered Successfully", seller });
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Unexpected Error Occured When Registering Seller" });
    }
}

exports.loginSeller = async (req, res) => {
    try {
        const { id } = req.user;
        console.log(id)
        const seller = await Seller.findOne({user:id}).populate("user");
        if (!seller) {
            res.status(401).json({success:false,message:"Seller Doesnot Exist"})
        } else {
            const passwordCheck = await bcrypt.compareSync( req.body.businessPassword,seller.businessPassword);
            if (!passwordCheck) {
                res.status(401).json({ success: false, message: "Invalid Seller Password" });
            } else {
                res.status(200).json({success:true,message:"Welcome Seller!",seller})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Unexpected Error Occured When Logging In Seller" });
    }
}

exports.getSellerInfo = async (req, res) => {
    try {
        const { id } = req.user;
        const seller = await Seller.findOne({user:id}).populate("user");
        res.status(200).json({success:true,message:"Seller Fetched Successfully!",seller})
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Unexpected Error Occured When Retrieving Seller Information"})
    }
}

exports.sellerPasswordChange = async (req,res) => {
    try {
        const {seller, oldPassword, newPassword } = req.body;
        const query = await Seller.findById(seller);
        const pwdCompare = bcrypt.compareSync(oldPassword,query.businessPassword);
        if (pwdCompare) {
            const hashedPassword=bcrypt.hashSync(newPassword, 10)
            const sellerUpdate = await Seller.findByIdAndUpdate(seller, { businessPassword: hashedPassword  });
        res.status(200).json({success:true,message:"Password Changed Successfully",seller:sellerUpdate})
        }
        else {
            res.status(401).json({success:false,message:"Invalid Old Password"}) 
        }
    } catch (error) {
        res.status(400).json({success:false,message:"Unexpected Error Occured When Changing Seller Password"})
        console.log(error)
    }
}