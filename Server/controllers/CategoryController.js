const express = require('express');
const { Category } = require('../models/Category');

const app = express();

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json({ status: true, message: "Category Addded Successfully",category });
    } catch (error) {
        res.status(401).json({status:false,message:"Unexpected Error occured in Creating Category"})
        console.log(error);
    }
}
exports.fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({status:true,message:"Categories Fetched Successfully",categories})
    } catch (error) {
        res.status(401).json({status:false,message:"Unexpected Error occured in Fetching Category"})
        console.log(error);
    }
}