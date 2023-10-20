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

exports.removeFromCartController = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findByIdAndDelete({ id });
        res.status(200).json({ success: true, message: "Item Removed From Cart",cart });
    } catch (error) {
        res.status(400).json({success:false,message:"Error when removing from cart"})
    }
}

exports.updateCartController = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findByIdAndUpdate(id, { ...req.body });
        res.status(200).json({ success: true, message: "Cart Updated Successfully", cart });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Error Occured When Updating Cart" });
    }
}