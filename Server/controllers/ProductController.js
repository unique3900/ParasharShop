const express = require('express');
const { Product } = require('../models/Product');
const app = express();
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, message: "Product Created Successfully",product });
    } catch (error) {
      console.log(error)
        res.status(400).json({ success: false, message: "Error in Product Creation", error })
    }
}

exports.fetchAllProducts = async (req, res) => {
        // Condition:
        // 1. User might have entered sorting criteria to fetch
        // 2. User might have fetched all by category
        // 3. User might have fetched all by brand
        // 3. We fetch all acc. to pagination
        // 5. Simply we may have to print all products in the homepage

        // So, get query string and then start fetch
        let query = Product.find({});
        let totalProductsQuery = Product.find({});
        if (req.query.category) {
            query = query.find({ category: {$in:req.query.category.split(',')} });
            totalProductsQuery = totalProductsQuery.find({
              category: {$in:req.query.category.split(',')},
            });
          }
          if (req.query.brand) {
            query = query.find({ brand: {$in:req.query.brand.split(',')} });
            totalProductsQuery = totalProductsQuery.find({ brand: {$in:req.query.brand.split(',') }});
          }
          if (req.query._sort && req.query._order) {
            query = query.sort({ [req.query._sort]: req.query._order });
          }
          const totalDocs = await totalProductsQuery.count().exec();
          console.log({ totalDocs });
          if (req.query._page && req.query._limit) {
            const pageSize = req.query._limit;
            const page = req.query._page;
            query = query.skip(pageSize * (page - 1)).limit(pageSize);
          }
          try {
            const products = await query.exec();
            res.set('X-Total-Count', totalDocs);
            res.status(200).json({ success: true, message: "Successfully Fetched All Products", products })
          } catch (err) {
            console.log(err)
            res.status(400).json({ success: false, message: "Error in Fetching All Products", err })
          }
};
exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({success:false,message:"Error in Finding Product By Id",err});
    }
  };
  
  exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
      //new:... used this because in return we will get latest document
      const product=await Product.findByIdAndUpdate(id,req.body,{new:true})
      product.discountPrice = Math.round(product.price*(1-product.discountPercentage/100))
      const updatedProduct = await product.save();
      res.status(200).json({success:true,message:"Updated Product Successfully",updatedProduct})
    } catch (error) {
      res.status(400).json({success:false,message:"Error in Updating Product",error});

    }
}
  
exports.fetchSellerProducts = async (req, res) => {
  try {
    const { seller } = req.params;
    const products = await Product.find({ seller });
    res.status(200).json({success:true,message:"Seller Products Fetched Successfully",products})
  } catch (error) {
    res.status(401).json({success:false,message:"Unexpected Error Occured When Fetching Seller Products"})
    console.log(error)
  }
}

exports.deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products=await Product.findByIdAndDelete(id,{new:true})
    res.status(200).json({success:true,message:"Product Deleted Successfully",products})
    
  } catch (error) {
    console.log(error);
    res.status(401).json({success:false,message:"Unexpected Error Occured",error})
  }
}