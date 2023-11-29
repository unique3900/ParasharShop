const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { createProduct } = require('./controllers/ProductController');
const { LoginController } = require('./controllers/AuthController');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const brandRouter = require('./routes/brandsRoute');
const addressRouter = require('./routes/addressRoute');
const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoute');
const sellerRouter = require('./routes/sellerRoute');
const orderRouter = require('./routes/orderRoutes');
const uploadRouter = require('./Image/uploadRoute');
const recommendRouter=require('./routes/recommendRoute')
const morgan = require('morgan');
const multer = require('multer');
const fs = require('fs');
const imageDownloader = require('image-downloader');

async function main() {
    await mongoose.connect("mongodb://localhost:27017/ParasharShop")
    
    // console.log("Database Connection Successful");
}
main().catch((err) => {
    console.log("Error Occured On Database Connection", err);
});


// ================= Initialization =====================

const server = express();

// Return Image When called http://localhost:8080/uploads/filename
server.use('/uploads',express.static("D:/Web Dev/MERN projects/ParasharShop/ParasharShop/Server/Image/uploads"))
server.use(morgan('dev'))
server.use(express.json());
server.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  }));



// ================ Routes ==================
server.use('/auth', userRouter.router);
server.use('/address',addressRouter.router);
server.use('/products', productRouter.router);
server.use('/category',categoryRouter.router );
server.use('/brands', brandRouter.router);
server.use('/cart', cartRouter.router);
server.use('/seller',sellerRouter.router );
server.use('/orders', orderRouter.router);
server.use('/upload', uploadRouter.router);
server.use('/recommend', recommendRouter.router);


// Handling Image Upload Operation Here
// Seperate router has been created aswell
const port = process.env.PORT;
console.log(port)
server.listen(port, () => {
    console.log("Server Started at port", port);

})


