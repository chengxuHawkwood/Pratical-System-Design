requireLogin = require('../middlewares/requireLogin')
mongoose = require('mongoose')
Thread = mongoose.model('threads');
const crypto = require('crypto');
const hashThread=(participant_ids)=>{
    const hash = crypto.createHash('sha512')
    hash.update(participant_ids.sort().join())
    return hash.digest('hex');
}
module.exports = (app)=>{
    app.post('/api/threads', requireLogin, async (req, res)=>{
        const {participant_ids} = req.body;
        const HashThreadNumber = hashThread(participant_ids);
        const thread = await Thread.findOne({HashThreadNumber:HashThreadNumber})
        if(!thread){
            const newthread = new Thread({
                HashThreadNumber:HashThreadNumber
            })
            await newthread.save();
            res.send(newthread);
        }else{
            res.send(thread);
        }
    })

}