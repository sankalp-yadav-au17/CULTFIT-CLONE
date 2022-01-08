const passport= require("../configs/passport")
function cookies(req, res,next) {
    const {cookies} = req
    if(cookies) {
        res.redirect("/products")
        next()
    }else{
      res.redirect("/home")
    }
    }
 module.exports = cookies