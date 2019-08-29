requireLogin = require('../middlewares/requireLogin')
const mongoose = require('mongoose');
const User = mongoose.model('users');
module.exports = (app)=>{
    app.patch('/api/users', requireLogin, async(req, res)=>{
        user = req.body
        updateUser = await User.findOneAndUpdate({_id:req.user.id}, user)
        res.redirect(303,'/');
    })

    app.get('/api/users', requireLogin, async (req,res)=>{
        
        const {followee}=req.query
        if(followee==-1){
            
            const count = await User.count();
            const limit = 10
            list = [] 
            for (i=0;i<limit;i++){
                var random = Math.floor(Math.random() * count)
                let toadd = await User.findOne().skip(random)
                if(!list.includes(toadd)) list.push(toadd)
            }
            list.sort((a,b)=>{a._id-b._id})
            res.send(list);

        }else{
            let goolgeRes=[]
            let idRes=[]

            try{
                goolgeRes= await User.find({googleId:followee})
                idRes = await User.findById(followee)
                
            }catch(err){
            }finally{
                res.send([...Object.assign(goolgeRes, idRes)]);
            }

        }

    })
}