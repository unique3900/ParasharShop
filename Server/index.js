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
const uploadRouter = require('./routes/uploadRoute');
const morgan = require('morgan');
const multer = require('multer');
const fs = require('fs');

async function main() {
    await mongoose.connect("mongodb://localhost:27017/ParasharShop")
    
    // console.log("Database Connection Successful");
}
main().catch((err) => {
    console.log("Error Occured On Database Connection", err);
});


// ================= Initialization =====================

const server = express();
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


// Handling Image Upload Operation Here
// Seperate router has been created aswell
const photoMiddleware = multer({dest:'uploads/'});

server.post('/uploads/', photoMiddleware.array('photos', 4), async (req, res) => {
    try {
        const uploadedFiles = [];
        for (var i = 0; i <= req.files.length; i++){
            const {path,originalname} = req.files[i];
            const parts = originalname.split('.');
            const extension = parts[parts.length - 1];
            const newPath = path + '.' + extension;
            fs.renameSync(path, newPath);
            uploadedFiles.push(newPath.replace('uploads\\',''));
        }
        res.status(200).json({success:true,message:"Local Image Uploaded Successfully",uploadedFiles})
    } catch (error) {
        res.status(401).json({success:false,message:'Uploading Local Image Failed',error})
        console.log(error)
    }
}).post('/upload-link', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})




const port = process.env.PORT;
console.log(port)
server.listen(port, () => {
    console.log("Server Started at port", port);
})


