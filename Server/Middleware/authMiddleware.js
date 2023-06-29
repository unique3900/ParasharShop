const JWT = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers["authorization"]) {
            res.json({ success: false, message: "No token Found" })
        }
        else {
            const token = req.headers["authorization"].split(" ")[1];
            JWT.verify(token, process.env.JWT_SECRET, (err, data) => {
                if (err) res.json({ success: false, message: "Error in jwt verify", err });
                else {
                    req.body._id = data._id;
                    req.body.email = data.email;
                    next();
                }
            });
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in auth Middleware"+error})
    }
}

module.exports = { authMiddleware };