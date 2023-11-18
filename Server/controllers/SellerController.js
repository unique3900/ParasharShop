const { Seller } = require("../models/Seller");
const bcrypt = require('bcrypt');

exports.registerSeller = async (req, res) => {
    try {
        const { user } = req.body;
        const sellerExist = await Seller.findOne({ user});
        if (sellerExist) {
            res.status(401).json({ success: false, message: "Seller Accoun already Exist Under this ID" });
        } else {
            const hashedPassword = await bcrypt.hashSync(req.body.businessPassword, 10);
            const seller = await Seller.create({...req.body,businessPassword:hashedPassword});
            res.status(200).json({ success: true, message: "Seller Registered Successfully", seller });
        }
    } catch (error) {
        res.status(401).json({ success: false, message: "Unexpected Error Occured When Registering Seller" });
    }
}

exports.loginSeller = async (req, res) => {
    try {
        const { id } = req.body;
        const seller = await Seller.findOne({ email: id }).populate("User");
        if (!seller) {
            res.status(401).json({success:false,message:"Seller Doesnot Exist"})
        } else {
            const passwordCheck = await bcrypt.compareSync(seller.businessPassword, req.body.businessPassword);
            if (!passwordCheck) {
                res.status(401).json({ success: false, message: "Invalid Seller Password" });
            } else {
                res.status(200).json({success:true,message:"Welcome Seller!",seller})
            }
        }
    } catch (error) {
        res.status(401).json({ success: false, message: "Unexpected Error Occured When Logging In Seller" });
    }
}

exports.getSellerInfo = async (req, res) => {
    try {
        const { id } = req.body;
        const seller = await Seller.findOne({ email: id }).populate("User");
        res.status(200).json({success:true,message:"Seller Fetched Successfully!",seller})
    } catch (error) {
        res.status(401).json({success:false,message:"Unexpected Error Occured When Retrieving Seller Information"})
    }
}