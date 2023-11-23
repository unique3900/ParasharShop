const mongoose = require('mongoose');
const { Brand } = require('../models/Brands');

exports.createBrand = async (req, res) => {
    try {
        const brands = await Brand.create(req.body);
        res.status(200).json({ status: true, message: "Brand Addded Successfully",brands });
    } catch (error) {
        res.status(400).json({status:false,message:"Unexpected Error occured in Creating Brands"})
        console.log(error);
    }
}
exports.fetchBrands = async (req, res) => {
    try {
        const brands = await Brand.find({});
        res.status(200).json({status:true,message:"Brands Fetched Successfully",brands})
    } catch (error) {
        res.status(400).json({status:false,message:"Unexpected Error occured in Fetching Brands"})
        console.log(error);
    }
}