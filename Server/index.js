const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;


const { createProduct } = require("./controllers/ProductController");
const { LoginController } = require("./controllers/AuthController");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const brandRouter = require("./routes/brandsRoute");
const addressRouter = require("./routes/addressRoute");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRoute");
const sellerRouter = require("./routes/sellerRoute");
const orderRouter = require("./routes/orderRoutes");
const uploadRouter = require("./Image/uploadRoute");
const recommendRouter = require("./routes/recommendRoute");
const morgan = require("morgan");
const multer = require("multer");
const fs = require("fs");
const imageDownloader = require("image-downloader");
const { User } = require("./models/User");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/ParasharShop");

  // console.log("Database Connection Successful");
}
main().catch((err) => {
  console.log("Error Occured On Database Connection", err);
});

// ================= Initialization =====================

const server = express();

// Return Image When called http://localhost:8080/uploads/filename
server.use(
  "/uploads",
  express.static(
    "D:/Web Dev/MERN projects/ParasharShop/ParasharShop/Server/Image/uploads"
  )
);
server.use(morgan("dev"));
server.use(express.json());
server.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

// Passport Js Setup
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

server.use(passport.authenticate("session"));

// ================ Routes ==================
server.use("/auth", userRouter.router);
server.use("/address", addressRouter.router);
server.use("/products", productRouter.router);
server.use("/category", categoryRouter.router);
server.use("/brands", brandRouter.router);
server.use("/cart", cartRouter.router);
server.use("/seller", sellerRouter.router);
server.use("/orders", orderRouter.router);
server.use("/upload", uploadRouter.router);
server.use("/recommend", recommendRouter.router);

// Passport JS Local Strategy Setup
passport.use(
  new LocalStrategy(async function (username, password, done) {
    // By defult username is there so we need to find by email
    try {
        const user = await User.findOne({ email:username });
        if (!user) {
            done(null, false,{message:"User Doesnot Exist"});
        }
        else {
            if ( bcrypt.compareSync(password,user.password)) {
                done(null,user)
            }
            else {
                done(null,false,{message:"Invalid Password"}) 
            }
    }
    } catch (error) {
        done(err)
    }
  })
);

// This creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null,user);
  });
});

//   This changes session variable req.user on being called from authorized request
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

function isAuth(req,res,next) {
    if (req.user) {
        next();
    }
    else {
        res.send(401)
    }
}
// Handling Image Upload Operation Here
// Seperate router has been created aswell
const port = process.env.PORT;
console.log(port);
server.listen(port, () => {
  console.log("Server Started at port", port);
});
