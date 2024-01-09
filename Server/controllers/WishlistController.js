const { Wishlist } = require("../models/Wishlist");

exports.createNewWishList = async (req,res) => {
    try {
        const { id } = req.user;
        const { product } = req.body;
        const wishlist = (await Wishlist.create({ product, user: id },{new:true})).populate('product');
        res.status(200).json({ success: true, message: "Product Added to Wishlist", wishlist });
        
    } catch (error) {
        res.status(400).json({ success: false, message: "Unexpected Error Occured When Creating Wishlist" });
    }
}
exports.deleteWishList = async (req, res) => {
    try {
        const { id } = req.params;
        const wishlist = await Wishlist.findByIdAndDelete(id, { new: true });
        res.status(200).json({ success: true, message: "Wishlist Deleted Successfully", wishlist });
    } catch (error) {
        res.status(400).json({ success: false, message: "Unexpected Error Occured When Deleting Wishlist" });
    }
}