const { Orders } = require("../models/Orders");
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

exports.updateOrderSellerSideController = async (req, res) => {
    const { id } = req.params;
    console.log(req.body.productId)
    try {
        const order=await Orders.findOneAndUpdate({ _id:id,'products.product.id': req.body.productId},{ $set: { 'products.$.status': req.body.value } },{new:true}).populate("selectedDeliveryAddress")
        res.status(201).json({success:true,message:"Order Status Updated Successfully",order})
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Error When Updating Order" });  
    }
}
exports.fetchSellerOrders = async (req, res) => {
try {
    const { id } = req.params;
    const order = await Orders.find({'products.seller':id}).populate("selectedDeliveryAddress")
    res.status(201).json({success:true,message:"Seller Orders Fetched Successfully",order})
} catch (error) {
    console.log(error)
    res.status(401).json({success:false,message:"Unexpected Error Occured When Fetching Seller Order"})
}

}
