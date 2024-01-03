const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


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
const { sanitizeUser, isAuth } = require("./Middleware/Auth");

const SECRETKEY = "SECRET";


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

// JWT Options
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRETKEY;

// ================ Routes ==================
server.use("/auth", userRouter.router);
server.use("/address", addressRouter.router);
server.use("/products",isAuth(), productRouter.router);
server.use("/category", categoryRouter.router);
server.use("/brands", brandRouter.router);
server.use("/cart", cartRouter.router);
server.use("/seller", sellerRouter.router);
server.use("/orders", orderRouter.router);
server.use("/upload", uploadRouter.router);
server.use("/recommend", recommendRouter.router);

// Passport JS Local Strategy Setup

passport.use('local',
  new LocalStrategy({usernameField:'email'},async function (email, password, done) {
   
    try {
        const user = await User.findOne({ email});
        if (!user) {
            done(null, false,{message:"User Doesnot Exist"});
        }
        else {
            if ( bcrypt.compareSync(password,user.password)) {
                const token=jwt.sign(sanitizeUser(user),SECRETKEY)
                done(null,token)
            }
            else {
                done(null,false,{message:"Invalid Password"}) 
            }
    }
    } catch (error) {
        done(error)
    }
  })
);

// Passport JS JWT Strategy Setup

passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findOne({ id: jwt_payload.sub });
            if (user) {
                return done(null, sanitizeUser(user) ); //This calls serializer
            } else {
                return done(null, false);
                // or you could create a new account
            }
    } catch (error) {
       return done(error,false);
    }
    
}));

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


// Handling Image Upload Operation Here
// Seperate router has been created aswell
const port = process.env.PORT;
console.log(port);
server.listen(port, () => {
  console.log("Server Started at port", port);
});
