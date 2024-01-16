const { Orders } = require("../models/Orders");
const { Product } = require("../models/Product")
const dotenv = require('dotenv').config();

const braintree = require('braintree');

// Braintree Payment Gateway
var gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:process.env.BRAINTREE_PRIVATE_KEY,
  });


exports.newOrderController = async (req, res) => {
    const { id } = req.user;
    try {
        const order = await Orders.create({...req.body,user:id });
        res.status(200).json({ success: true, message: "Order Placed Successfully",order });
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Error Occured When Creating New Order"})
    }
}
exports.userOrderController = async (req, res) => {
    const {id} = req.user;
    try {
        const order = await Orders.find({ user: id }).populate("selectedDeliveryAddress")
        // console.log(order)
        res.status(200).json({success:true,message:"Orders Fetched Successfully",order})
    } catch (error) {
        // console.log(error)
        res.status(401).json({success:false,message:"Error Occured When Fetching User Order"})
    }
}

exports.updateOrderSellerSideController = async (req, res) => {
    const { id } = req.params;
    console.log(req.body.value);
    try {
        const order=await Orders.findOneAndUpdate({ _id:id,'products.product.id': req.body.productId},{ $set: { 'products.$.status': req.body.value } },{new:true}).populate("selectedDeliveryAddress")
        res.status(201).json({success:true,message:"Order Status Updated Successfully",order})
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Error When Updating Order" });  
    }
}

exports.updateRatingStatusController = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    try {
        const order=await Orders.findOneAndUpdate({ _id:id,'products.product.id': req.body.productId},{ $set: { 'products.$.rated': req.body.value } },{new:true}).populate("selectedDeliveryAddress")
        res.status(201).json({success:true,message:"Rating Status Updated Successfully",order})
    } catch (error) {
        console.log(error)
        res.status(401).json({ success: false, message: "Error When Updating Rating Status" });  
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

exports.fetchTotalOrers = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Orders.aggregate([
            {
                $match: {
                    'products.seller': id,
                    'products.product.seller': id,
                    createdAt: { $exists: true }
                }

            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ])



        const months = [];
        const orders = [];
        const year = new Date(Date.now()).getFullYear();
        function getMonthName(monthNumber) {
            const date = new Date(year, monthNumber - 1, 1); // Months are 0-indexed in JavaScript, so subtract 1
            const monthName = date.toLocaleString('en-US', { month: 'long' });
            return monthName;
        }
       
        for (var i = 0; i < order.length; i++){
            if (order[i]._id.year == year) {
                months.push(getMonthName(order[i]._id.month) )
                orders.push(order[i].count)
            }
        }
        res.status(200).json({success:true,message:"Order Fetched Successfully",months,orders})
    } catch (error) {
        console.log(error);
        res.status(401).json({success:false,message:"Error When Fetching Total Order"})
    }
}




// Payment Gateway api
exports.braintreeTokenController = async (req, res) => {
    try {
        // As given by their documentation
        // Token mathi ko var gateway bata aaucha
        gateway.clientToken.generate({}, function (err, response){
            if (err) {
                res.json({err})
            }
            else {
                res.json({response})
            }
        })
    } catch (error) {
        console.log(error)
    }
}

exports.braintreePaymentController = async (req, res) => {
    const { id } = req.user;
    try {
        const { totalAmount,nonce } = req.body;

        let newTransaction = gateway.transaction.sale({
            amount: totalAmount * 100,
            paymentMethodNonce: nonce,
            options: {
              submitForSettlement: true,
            },
        },
        async function(err, response) {
            if (response) {
                const order = await Orders.create({...req.body,user:id });
                 res.status(200).json({ success: true, message: "Order Placed Successfully",order });
            }
            else {
                res.status(301).json({ success: false, message:"Error When Placing Order Via Card",err });
            }
        }
        )
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,message:"Unexpected error occured when processing card payment",error})
    }
}
