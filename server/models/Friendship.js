const mongoose = require('mongoose');
const {Schema} = mongoose;

const friendshipSchema = new Schema({
    from:{type:Schema.Types.ObjectId, index:true, required:true},
    to:{type:Schema.Types.ObjectId, ref:'users', index:true, required:true}
})

mongoose.model('friendships',friendshipSchema)