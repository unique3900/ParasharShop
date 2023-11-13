const { Cart } = require("../models/Cart");


exports.fetchUserCart = async (req, res) => {
    try {
        const  id  = req.params.id;
        console.log(id)
        const data = await Cart.find({user:id}).populate("user").populate("product")
        res.status(200).json({ success: true, message: "User Cart Fetched Successfully", data:[...data] });


    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,message:"Error in Fetching User Cart"})
    }
}

exports.addToCartController = async (req, res) => {
    try {
        
        const products = await Cart.create({ product:req.body.productId, user: req.body.user });

        res.status(200).json({ success: true, message: "Added to Cart Successfully", products });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,message:"Error when adding to cart"})
    }
}

exports.removeFromCartController = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Item Removed From Cart",cart });
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,message:"Error when removing from cart"})
    }
}

exports.updateCartController = async (req, res) => {
    const { id } = req.body;
    try {
        const cart = await Cart.findByIdAndUpdate(id, {quantity:req.body.quantity});
        res.status(200).json({ success: true, message: "Cart Updated Successfully", cart });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Error Occured When Updating Cart" });
    }
}

exports.resetCartController = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await Cart.deleteMany({ user: id });
        res.status(200).json({ success: true, message: "Cart Reset Successful", data });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Error Occured when reseting Cart", error });
    }
}