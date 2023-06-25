const UserModel = require("../Model/UserModel");
const bcrypt = require('bcrypt');
const RegisterController = async (req, res) => {
    const { fullName, email, phone, password, address } = req.body;
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
        const salt = 10;
        const hashedPwd =  bcrypt.hashSync(password, salt);
        const fetchData = await UserModel.create({ fullName, email, password: hashedPwd, phone, address });
        res.json({ success: true, message: "User Registered Successfully", fetchData });
        
    } catch (error) {
        console.log(error);
        res.json({success:true,message:"Error in login controller",error})
    }
}


const LoginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        
    } catch (error) {
        console.log(error);
        res.json({success:true,message:"Error in login controller",error})
    }
}

module.exports = { LoginController,RegisterController };