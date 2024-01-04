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
    return token
  };
  

exports.COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    signed: true,
    SameSite: 'none'
}