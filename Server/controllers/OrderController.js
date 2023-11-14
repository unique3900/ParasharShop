const { Orders } = require("../models/Orders")
const { Product } = require("../models/Product")

exports.newOrderController = async (req, res) => {
    try {
        const order = await Orders.create({...req.body });
        res.status(200).json({ success: true, message: "Order Placed Successfully",order });
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Error Occured When Creating New Order"})
    }
}
exports.userOrderController = async (req, res) => {
    const { id } = req.params;
    try {
        
        const order = await Orders.find({ user: id }).populate("selectedDeliveryAddress")
        res.status(200).json({success:true,message:"Orders Fetched Successfully",order})
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Error Occured When Fetching User Order"})
    }
}

exports.updateOrderController = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Orders.findByIdAndUpdate(id, { ...req.body });
        res.status(200).json({success:true,message:"Order Updated Successfully",order})
    } catch (error) {
        res.status(401).json({ success: false, message: "Error When Updating Order" });  
    }
}