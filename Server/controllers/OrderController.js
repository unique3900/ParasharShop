const { Orders } = require("../models/Orders");
const { Orders2 } = require("../models/Orders2");
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
        console.log(order)
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
exports.fetchSellerOrders = async (req, res) => {
try {
    const { id } = req.params;
    const order = await Orders.find({'products.seller':id}).populate("selectedDeliveryAddress")
    res.status(201).json({success:false,message:"Seller Orders Fetched Successfully",order})
} catch (error) {
    console.log(error)
    res.status(401).json({success:false,message:"Unexpected Error Occured When Fetching Seller Order"})
}

}

exports.fetchSellerOrdersDemo = async (req, res) => {
    try {
        const { id } = req.params;
       const order=await Orders2.find({ 'products.seller': id }).populate('products.product').populate("selectedDeliveryAddress").populate('products.seller').populate('user')
       res.status(201).json({success:false,message:"Seller Orders Fetched Successfully",order})
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Unexpected Error Occured When Fetching Seller Order"}) 
    }
}