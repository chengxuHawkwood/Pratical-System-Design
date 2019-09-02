requireLogin = require('../middlewares/requireLogin')
mongoose = require('mongoose')
Message = mongoose.model('messages')
const  messageConfig= require('../config/MessageConfig')
module.exports=(app)=>{
    app.get('/api/messages', requireLogin, async(req, res)=>{
        try{
            const {thread, offset} = req.query;
            console.log(thread, offset);
            showMessages =  await Message.find({threadId:thread})
            .sort({created_at:-1})
            .skip(parseInt(offset))
            .limit(messageConfig.messageLimit).populate('user')
            res.send(showMessages.reverse());
        }catch(error){
            console.log(error);
        }
    })

    app.post('/api/messages', requireLogin, async(req, res)=>{
        try{
            const {form_values, thread} = req.body;
            const newmessage = new Message({
                threadId:thread,
                user:req.user._id,
                content:form_values
            })
            await newmessage.save();
            showMessages =  await Message.find({threadId:thread})
            .sort({created_at:-1})
            .limit(messageConfig.messageLimit).populate('user')

            res.send(showMessages.reverse());
        }catch(error){
            console.log(error);
        }

    })
}