const mongoose = require('mongoose');
const {Schema} = mongoose;
const Message= new Schema({
    threadId:{type:Schema.Types.ObjectId},
    user:{type:Schema.Types.ObjectId, ref='users'},
    content:{type:String},
    created_at:{type: Date, default: Date.now, index:true}
})

mongoose.model('messages', Message);