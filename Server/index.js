const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { createProduct } = require('./controllers/ProductController');
const { LoginController } = require('./controllers/AuthController');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const brandRouter = require('./routes/brandsRoute');
const morgan = require('morgan');

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
server.use('/products', productRouter.router);
server.use('/category',categoryRouter.router );
server.use('/brands', brandRouter.router);




const port = process.env.PORT;
console.log(port)
server.listen(port, () => {
    console.log("Server Started at port", port);
})



