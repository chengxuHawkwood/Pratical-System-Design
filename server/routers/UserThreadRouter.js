requireLogin = require('../middlewares/requireLogin')
mongoose = require('mongoose')
UserThread = mongoose.model('userthreads');
module.exports=(app)=>{
    app.get('/api/userthreads', requireLogin, async (req, res)=>{
        const {thread_id}=req.query;
        
        const userthread = await UserThread.findOne().and([{thread:thread_id},{user:req.user._id}])
        if(!userthread){
            const newuserthread = new UserThread({
                user:req.user._id,
                thread:thread_id,
                joined_at:Date.now()
            })
            await newuserthread.save()
            res.send(newuserthread);
        }else{
            res.send(userthread);
        }
    })

}