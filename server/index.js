const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyparser = require('body-parser')
const keys = require('./config/dev')
require('./models/User');
require('./models/Post');
var app = express()
app.use(bodyparser.json());

mongoose.connect(keys.mongoURI)
app.use(cookieSession({
    maxAge: 86400*1000*30, //This equals 30 days
    keys:[keys.cookieKey]
}))
require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());
require('./routers/authRouter')(app);
require('./routers/postRouter')(app);
require('./routers/FollowRouter')(app);
app.listen(5000);