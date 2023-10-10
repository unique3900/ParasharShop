const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { createProduct } = require('./controllers/ProductController');
const { LoginController } = require('./controllers/AuthController');
const productRouter = require('./routes/productRoutes');

async function main() {
    await mongoose.connect("mongodb://localhost:27017/ParasharShop")
    
    // console.log("Database Connection Successful");
}
main().catch((err) => {
    console.log("Error Occured On Database Connection", err);
});


// ================= Initialization =====================

const server = express();
server.use(express.json());
server.use(cors());


// ================ Routes ==================
server.use('/products', productRouter.router);




const port = process.env.PORT;
console.log(port)
server.listen(port, () => {
    console.log("Server Started at port", port);
})



