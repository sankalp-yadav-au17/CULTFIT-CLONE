const passport = require("passport");
const User = require("../models/user.model");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { newToken } = require("../controllers/user.controller");
// console.log(newToken)
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2345/auth/google/callback",
      userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // console.log("accessToken, refreshToken, profile",accessToken, refreshToken, profile);
      // console.log(profile);//
      // console.log(profile);
      const email = profile?._json?.email;
      let user;
      try {
        user = await User.findOne({ email }).lean().exec();
        if (!user) {
          user = await User.create({ email: email, password: uuidv4() });
        }
        const token = newToken(user);
        return done(null, { user, token,profile });
      } catch (e) {
        console.log("e", e);
      }
    }
  )
);

module.exports = passport;
