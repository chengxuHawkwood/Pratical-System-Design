const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/dev');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
    .then(user=>{
        done(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecert,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.findOne({googleId:profile.id})
    if(!user){
        const newuser =  new User({googleId:profile.id, name:profile.displayName, photo:profile.photos[0].value})
        newuser.follows = [...newuser.follows, newuser._id];
        await newuser.save()
        cb(null, newuser)
    }else{
        cb(null, user)
    }
  }
));