mongoose = require('mongoose')
const { Schema } = mongoose;
UserThread = new Schema({
    user:{type:Schema.Types.ObjectId, ref:'users', require:true ,index:true},
    thread:{type:Schema.Types.ObjectId, ref:'threads', require:true, index:true},
    unread:{type:Number, default:0},
    is_muted:{type:Boolean, default:false},
    updated_at:{type:Date, default:Date.now},
    joined_at:{type:Date, require:true}
})

mongoose.model('userthreads', UserThread)