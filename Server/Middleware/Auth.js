const { Seller } = require('../models/Seller');
const { User } = require('../models/User');

// Is Logged in

exports.isLoggedIn = async (req, res, next) => {
    try {
        const user = req.params.id;
        const userExist = await User.findOne({ id: user });
        if (userExist) {
            next();
        } else {
            res.status(401).json({success:false,message:"Not Authorized to Proceed!"})
        }
    } catch (error) {
        res.status(401).json({success:false,message:"Error in isLoggedIn middleware"})
    }
}
// Is Seller
exports.isSeller = async (req, res, next) => {
    try {
        const uid = req.body.id;
        const sellerExist = await Seller.findOne({ email: uid })
        if (sellerExist) {
            next();
        } else {
            res.status(401).json({success:false,message:"Seller Doesnot Exist!"})
        }
    } catch (error) {
       res.status(401).json({success:false,message:"Error in isSeller Middleware"}) 
    }
}

// JWT Implementation 

