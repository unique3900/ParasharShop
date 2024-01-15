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

exports.sellerPasswordChange = async () => {
    try {
        const {seller, OldPassword, newPassword } = req.body;
        const sellerExist = await Seller.findById(seller);
        if (!sellerExist) {
            res.status(300).json({ success: false, message: "Seller Doesnot Exist" });
        }
        if (sellerExist.businessPassword !== OldPassword) {
            res.status(300).json({ success: false, message: "Old Password Doesnot Match" });
        }
        else {
            const seller = await Seller.findByIdAndUpdate(seller, { businessPassword: newPassword });
            res.status(200).json({success:true,message:"Password Updated Successfully",seller})
        }
    } catch (error) {
        res.status(400).json({success:false,message:"Unexpected Error Occured When Changing Seller Password"})
        console.log(error)
    }
}