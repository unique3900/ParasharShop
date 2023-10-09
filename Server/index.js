const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');


async function main() {
    await mongoose.connect("mongodb://localhost:27017/ParasharShop").catch((err) => {
        console.log("Error Occured On Database Connection", err);
    })
    
    // console.log("Database Connection Successful");
}
main();

const server = express();
server.use(express.json());
server.use(cors());


const port = process.env.PORT;
console.log(port)
server.listen(port, () => {
    console.log("Server Started at port", port);
})



