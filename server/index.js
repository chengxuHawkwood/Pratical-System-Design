const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyparser = require('body-parser')
let keys = require('./config/dev')
if(process.env.NODE_ENV == 'test'){
    keys = require('./config/test')
}
require('./models/User');
require('./models/Post');
require('./models/Friendship');
require('./models/UserThread');
require('./models/Message');
require('./models/Thread');

var redis = require('redis')
var bluebird = require("bluebird");
bluebird.promisifyAll(redis);
client = redis.createClient();

client.on('error', function (err) {
    console.log(err);
});

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
require('./routers/postRouter')(app, client);
require('./routers/FollowRouter')(app);
require('./routers/FriendShipRouter')(app);
require('./routers/threadRouter')(app);
require('./routers/UserThreadRouter')(app);
require('./routers/chatMessageRouter')(app);
require('./services/socketio')(app, client);
app.listen(5000);
module.exports = app;