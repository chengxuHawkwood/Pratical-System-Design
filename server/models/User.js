const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId:String,
    name:String,
    photo:String,
    follows:{type:[Schema.Types.ObjectId], default:[]}
});

mongoose.model('users', userSchema)