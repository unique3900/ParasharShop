const {Address}=require("../models/Address");

exports.addUserAddressController = async (req, res) => {
    try {
        const address = await Address.create(req.body);
        res.status(200).json({success:true,message:"Address Saved Successfully",address})
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Error When Adding Addresses", error });
    }
}
exports.fetchUserAddressesController = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.find({user:id}).populate("user");
        res.status(200).json({ success: true, message: "Addresses Fetched Successfully", address });

    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Error When Fetching Addresses", error });
    }
}