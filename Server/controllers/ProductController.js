const express = require("express");
const { Product } = require("../models/Product");
const app = express();
const mongoose = require("mongoose");
exports.createProduct = async (req, res) => {
  try {
    const { highlights } = req.body;
    // console.log(highlights)
    var highlightArray = [];
      // Split input by commas and remove leading/trailing whitespaces
    const newHighlights = highlights.split(',').filter(Boolean);
         // Remove empty strings from the array
    const product = await Product.create({...req.body,highlights:newHighlights});
    res
      .status(201)
      .json({
        success: true,
        message: "Product Created Successfully",
        product,
      });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Error in Product Creation", error });
  }
};

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
    query = query.find({ category: { $in: req.query.category.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(",") },
    });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  const totalDocs = await totalProductsQuery.count().exec();
  // console.log({ totalDocs });
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  try {
    const products = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res
      .status(200)
      .json({
        success: true,
        message: "Successfully Fetched All Products",
        products,
      });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ success: false, message: "Error in Fetching All Products", err });
  }
};
exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Error in Finding Product By Id", err });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { highlights } = req.body;
  var highlightArray = [];

  if (typeof (highlights) == "string") {
    const newHighlights = highlights?.split(',')?.filter(Boolean);
    highlightArray = newHighlights;
  }
  else {
    highlightArray = highlights; 
  }
  // Split input by commas and remove leading/trailing whitespaces
  
  try {
    //new:... used this because in return we will get latest document
    const product = await Product.findByIdAndUpdate(id, {...req.body,highlights:highlightArray}, {
      new: true,
    });
    product.discountPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    );
    const updatedProduct = await product.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Updated Product Successfully",
        updatedProduct,
      });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error in Updating Product", error });
  }
};

exports.fetchSellerProducts = async (req, res) => {
  try {
    const { seller } = req.params;
    const products = await Product.find({ seller });
    res
      .status(200)
      .json({
        success: true,
        message: "Seller Products Fetched Successfully",
        products,
      });
  } catch (error) {
    res
      .status(401)
      .json({
        success: false,
        message: "Unexpected Error Occured When Fetching Seller Products",
      });
    console.log(error);
  }
};

exports.updateProductRating = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log(req.body)
    const { productId, rating } = req.body;

    // console.log(req.body)
    const productExist = await Product.findById(productId);
    const updatedRating = productExist.rating + rating;

    const products = await Product.findByIdAndUpdate({_id:productId}, { totalRatings: productExist.totalRatings + 1, rating: updatedRating });
    res.status(200).json({success:true,message:"Rating Updated Successfully",products})
  } catch (error) {
    console.log(error)
    res.status(400).json({success:false,message:"Error When Updating Product Rating Status"})
  }
}
exports.deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOp = await Product.findByIdAndDelete(id, { new: true });
    const products = await Product.find({ seller: req.body.seller });
    res
      .status(200)
      .json({
        success: true,
        message: "Product Deleted Successfully",
        products,
      });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "Unexpected Error Occured", error });
  }
};
exports.searchProduct = async (req, res) => {
  try {
    const { keyword } = req.query;
    let products = [];
    if (keyword.length > 0) {
       products = await Product.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ]
      });
    }
    else {
      products = await Product.find({});
    }
   
    res.status(200).json({ success: true, message: "Products Searching Successful", products });
  } catch (error) {
    console.log(error)
    res.status(401).json({success:false,message:"Unexpected Error Occured When Searching Products"})
  }
};

exports.fetchTotalProducts = async (req, res) => {
  try {
    const { seller } = req.params;

    const product = await Product.aggregate([
      {
        $match: {
          seller: new mongoose.Types.ObjectId(seller),
          createdAt: { $exists: true },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    const months = [];
    const products = [];
    const year = new Date(Date.now()).getFullYear();
    function getMonthName(monthNumber) {
      const date = new Date(year, monthNumber - 1, 1);
      const monthName = date.toLocaleString("en-US", { month: "long" });
      return monthName;
    }

    for (var i = 0; i < product.length; i++) {
      if (product[i]._id.year == year) {
        months.push(getMonthName(product[i]._id.month));
        products.push(product[i].count);
      }
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Products Fetched Successfully",
        months,
        products,
      });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({
        success: false,
        message: "Error Occured When Fetching Total Products",
      });
  }
};