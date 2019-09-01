const requireLogin  = require('../middlewares/requireLogin')
const mongoose = require('mongoose');
const Friendship = mongoose.model('friendships')
const User = mongoose.model('users');
module.exports =(app)=>{
    app.get('/api/friendship',requireLogin, async(req, res)=>{
        try{
            const {type} = req.query
            switch (type){
                default:
                    const followers = await Friendship.find({from:req.user._id})
                    res.send(followers);
            }
        }catch(error){
            console.log(error);
        }

    })
    app.post('/api/friendship', requireLogin, async(req,res)=>{
        try{
            const {follow_id} = req.body;
            const friendship = new Friendship({
                from:req.user._id,
                to:follow_id
            })
            const followers = await Friendship.find().and([{from:req.user.id}, {to:follow_id}])
            if(followers.length==0) await friendship.save();

            res.redirect('/');
        }catch(error){
            console.log(error);
            res.redirect('/');
        }
        
    })
    app.delete('/api/friendship', requireLogin, async(req, res)=>{
        try{
           
            const {follow_id}=req.body
            await Friendship.deleteOne().and([{from:req.user.id}, {to:follow_id}]);
            res.send(follow_id);
        }catch(error){
            console.log(error);
        }
    })
}