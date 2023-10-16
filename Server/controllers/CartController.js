const { Cart } = require("../models/Cart");


exports.fetchUserCart = async (req, res) => {
    try {
        const  id  = req.params.id;
        console.log(id)
        const products = await Cart.find({user:id})
        res.status(200).send(products).json({ success: true, message: "User Cart Fetched Successfully", products });


    } catch (error) {
        res.status(400).json({success:false,message:"Error in Fetching User Cart"})
    }
}

exports.addToCartController = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Cart.create({ ...req.body, user: id });
        res.status(200).send(products).json({ success: true, message: "Added to Cart Successfully", products });
        
    } catch (error) {
        res.status(400).json({success:false,message:"Error when adding to cart"})
    }
}