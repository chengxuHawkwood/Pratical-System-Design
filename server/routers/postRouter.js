const requireLogin =require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const User = mongoose.model('users');
const RateLimiter = require('../middlewares/RateLimiter');
const concat = async (x,y) =>
  await x.concat(y)
module.exports=(app, redisclient)=>{
    //pull model find each followes' recent activity and merge them to provide for the user
    app.get('/api/posts',requireLogin, async(req, res)=>{
        try{
          let followees = await User.findById(req.user.id,['follows']);
          followees = Object.values(followees.follows);
          let list =[]
          for(i=0;i<followees.length;i++){
            list.push(...await Post.find({_user:followees[i]}).sort({created_at:-1}).limit(10).populate('_user'))
          }
          list = list.sort(function (a, b) {
            return -new Date(a.created_at).getTime() + new Date(b.created_at).getTime()
          });
          res.send(list);
        }catch(err){
          console.log(err)
        }

    });
    app.post('/api/posts', 
              requireLogin, 
              RateLimiter({redisclient:redisclient, 
                           limitNumber:2, 
                           limitTime:10000,
                           method:"postPosts",
                           errorMessage:"You can not post more than 2 times in 10 seconds"
                          }),
             async (req, res)=>{
                const {tweet} = req.body 
                const post = new Post({
                    message:tweet,
                    _user:req.user.id
                })
                await post.save();
                res.redirect('/');
    });
  //  app.patch('/posts',);
  //  app.delete('/posts',);
}