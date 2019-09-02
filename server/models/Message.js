const mongoose = require('mongoose');
const {Schema} = mongoose;
const Message= new Schema({
    threadId:{type:Schema.Types.ObjectId, index:true, require:true},
    user:{type:Schema.Types.ObjectId, ref:'users'},
    content:{type:String, require:true},
    created_at:{type: Date, default: Date.now, index:true}
})

mongoose.model('messages', Message);