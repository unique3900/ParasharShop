const {Address}=require("../models/Address");

exports.addUserAddressController = async (req, res) => {
    const { id } = req.user;
    try {
        const address = await Address.create({...req.body,user:id});
        res.status(200).json({success:true,message:"Address Saved Successfully",address})
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Error When Adding Addresses", error });
    }
}
exports.fetchUserAddressesController = async (req, res) => {
    try {
        const { id } = req.user;
        const address = await Address.find({user:id}).populate("user");
        res.status(200).json({ success: true, message: "Addresses Fetched Successfully", address });

    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Error When Fetching Addresses", error });
    }
}

exports.deleteAddressController = async (req, res) => {
    try {
        const { id } = req.params;
        const address=await Address.findByIdAndDelete(id).populate("user");
        res.status(200).json({success:true,message:"Address Deleted Successfully",address})
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Error When Deleting Address",error})
    }
}
exports.updateAddressController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        const address = await Address.findByIdAndUpdate(id,{...req.body}).populate("user");
        // console.log("Updated Address", address);
        res.status(201).json({success:true,message:"Address Updated Successfully",address})
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Error When Updating Address",error})
    }
}