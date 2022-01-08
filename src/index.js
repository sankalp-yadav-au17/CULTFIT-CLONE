const express=require('express');
const cookieParser = require('cookie-parser')

let app=express();

app.use(cookieParser());


const Razorpay=require('razorpay');
require('dotenv').config();

const razorpay= new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
})



const path=require('path');
app.use(express.json());


app.set('view engine','ejs');

app.use(express.static("public"))

const mycartController =require('./controllers/Mycart.controller');
const productController = require('./controllers/products.controller');

const user= require('./models/user.model');

app.use("/mycarts",mycartController);
app.use("/products",productController);


app.get("/payment",AuthCheck,(req,res) => {
    res.render("pay");
})

app.get("/care",(req,res) => {
    res.render("care");
})
app.get("/home",(req,res) => {
    res.render("home");
})

app.post("/successful",(req,res) => {
    res.render("successful");
})

app.get("/successful",(req,res) => {
    res.render("successful");
})

app.get("/desc",(req,res) => {
    res.render("descPage");
})
app.get("/eat",(req,res) => {
    res.render("eat_order");
})
app.get("/eat_meal",(req,res) => {
    res.render("eat_meal");
})
app.get("/gym",(req,res) => {
    res.render("gym");
})
app.get("/menstore",(req,res) => {
    res.render("mens-store");
})
app.get("/mindfulness",(req,res) => {
    res.render("mindfulnessPage");
})
app.get("/onlinept",(req,res) => {
    res.render("onlinept");
})
app.get("/productdisplay",AuthCheck,(req,res) => {
    res.render("product_display");
})
app.get("/store",(req,res) => {
    res.render("store");
})
app.get("/therapy",(req,res) => {
    res.render("therapyPage");
})
app.get("/products/:category",(req,res) => {
    res.render("products");
})
app.get("/products",(req,res) => {
    res.render("products");
})
app.get("/login",(req,res) => {
    res.render("login");
})


app.get("/logout",(req,res) => {
    res.clearCookie("jwt");

    res.render("login");
})

app.post("/order",(req,res) => {
    
    let options={
        amount: req.body.price,
        currency: "INR",
        receipt: "receipt#1",
        // notes: {
        //     key1: "value3",
        //     key2: "value2"
        // }
    }
    // console.log("options",options);
    razorpay.orders.create(options, function(err, order) {
        // console.log(order);
        res.json(order);
    })
})

// google auth
const passport = require('./configs/passport');

passport.serializeUser(function( {user,token},done) {
done(null,{user,token});
})

passport.deserializeUser(function( {user,token},done) {
    done(null,{user,token});
})

app.get('/', function(req, res) {
    res.render('home');
  });

app.get("/auth/google/failure",function (req,res){
    return res.send("Something went wrong")
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));




app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}),function (req,res) {
    
// console.log("user 11",req.profile);
// console.log("picture", req.profile._json.picture);
 res.cookie("jwt", req.user.token,{
    expires:new Date(Date.now() + 60000000000000000000),
    httpOnly:false
});
return res.redirect("/home")
    // return res.send("hey success")

});

function AuthCheck(req, res,next) {
    const token = req.cookies.jwt
    // console.log("token ",token)
// next
if(!token){
    res.redirect("/login")
   
}else{
    next()
   
}

}
// google auth

// app.listen(port, async function(){
//     await connect();
//     console.log(`listening on port ${port}`)
// })
module.exports =app;
// module.exports=port;