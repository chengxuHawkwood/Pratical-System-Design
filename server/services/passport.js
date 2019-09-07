const passport = require('passport');
const keys = require('../config/dev');
const mongoose = require('mongoose');
const User = mongoose.model('users');
let Strategy;
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then(user=>{
        done(null, user);
    });
});

Strategy = require('passport-google-oauth20').Strategy;



passport.use(new Strategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecert,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.findOne({googleId:profile.id})
    if(!user){
        const newuser =  new User({googleId:profile.id, name:profile.displayName, photo:profile.photos[0].value})
        await newuser.save()
        cb(null, newuser)
    }else{
        cb(null, user)
    }
  }
));

