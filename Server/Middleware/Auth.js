const passport=require('passport')

exports.isAuth = (req, res, next) => {
return passport.authenticate('jwt')
}

exports.sanitizeUser = (user) =>{
    return{id:user.id,email:user.email,role:user.role}
}

exports.CookieExtractor =  function (req) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }

    //For RUnning on local not on hosting
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTUyZTY5NzFmNWFhOWQzNjQ2YTIwZSIsImVtYWlsIjoicHJhZGhhbmJoaXNtYUBnbWFpbC5jb20iLCJyb2xlIjoiYnV5ZXIiLCJpYXQiOjE3MDQyOTMyMzB9.VDfBwxcvTTZXfU5NBh29Yiv2laz6_LbJCyRjNd-ZwTc";
    return token
  };
  

exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    signed: true,
    SameSite: 'none'
}