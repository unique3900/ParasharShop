const { Wishlist } = require("../models/Wishlist");

exports.getUserWishList = async (req,res) => {
    const { id } = req.user;
    try {
        const wishlist = await Wishlist.find({ user: id }, { new: true }).populate('product');
        res.status(200).json({ success: true, message: "Successfully Fetched Wishlist", wishlist });
    } catch (error) {
        res.status(400).json({success:false,message:"Unexpected error occured when fetching wishlist"})
    }

}

exports.createNewWishList = async (req,res) => {
    try {
        const { id } = req.user;
        const { product } = req.body;

        const addWish = await Wishlist.create({ product, user: id });
        const wishlist=await Wishlist.find({user:id}).populate("user").populate("product")

        console.log(wishlist)
        res.status(200).json({ success: true, message: "Product Added to Wishlist", wishlist });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: "Unexpected Error Occured When Creating Wishlist" });
    }
}
exports.deleteWishList = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: user } = req.user;
        const deleteOp = await Wishlist.findByIdAndDelete(id).populate("user").populate("product");
        const wishlist=await Wishlist.find({user}).populate("user").populate("product")
        res.status(200).json({ success: true, message: "Wishlist Deleted Successfully", wishlist });
    } catch (error) {
        res.status(400).json({ success: false, message: "Unexpected Error Occured When Deleting Wishlist" });
    }
}

exports.resetWishlistController = async (req, res) => {
    try {
        const { id } = req.user;
        console.log("Reset wish",id)
        const wishlist= await Wishlist.deleteMany({user:id});
        res.status(200).json({ success: true, message: "Wishlist Reset Successfully", wishlist });
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Error Occured when reseting Wishlist", error });
    }
}