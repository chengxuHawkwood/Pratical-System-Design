const requireLogin =require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const User = mongoose.model('users');
const concat = async (x,y) =>
  await x.concat(y)
module.exports=(app)=>{
    //pull model find each followes' recent activity and merge them to provide for the user
    app.get('/api/posts',requireLogin, async(req, res)=>{
        try{
          let followees = await User.findById(req.user.id,['follows']);
          followees = Object.values(followees.follows);
          let list =[]
          for(i=0;i<followees.length;i++){
            list.push(...await Post.find({_user:followees[i]}).sort({created_at:-1}).limit(10).populate('_user'))
          }
          res.send(list);
        }catch(err){
          console.log(err)
        }

    });
    app.post('/api/posts', requireLogin, async (req, res)=>{
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