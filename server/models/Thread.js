mongoose = require('mongoose')
const {Schema} = mongoose;
const Thread =new Schema({
    HashThreadNumber :{type:String, require:true, index:true},
    last_message:{type:String},
    participants:[{type:Schema.Types.ObjectId}],
    created_at:{type:Date, default:Date.now, index:true}
})
 mongoose.model('threads', Thread);