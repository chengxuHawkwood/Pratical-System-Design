const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    message:{type: String},
    created_at: {type: Date, default: Date.now, index:true},
    updated_at: {type: Date, default: Date.now},
    _user:{type:Schema.Types.ObjectId, ref:'users', index:true}

});

mongoose.model('posts', postSchema)