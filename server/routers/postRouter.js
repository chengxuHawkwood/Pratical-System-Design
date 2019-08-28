const requireLogin =require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Post = mongoose.model('posts');
module.exports=(app)=>{
    app.get('/api/posts',requireLogin, async(req, res)=>{
        const list = await Post.find({_user:req.user.id})
        res.send(list);
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