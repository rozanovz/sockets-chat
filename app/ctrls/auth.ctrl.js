const User = require('../models/User');
const jwt = require('jsonwebtoken');
const store = require('../constants/index');

module.exports = (req, res) => {
  User.findOne({name: req.body.username}).then((user)=>{
    if(!user){
      console.log(`there is no such user, i will create one for you :)`);
      
      let newUser = new User({
        name: req.body.username,
        password: req.body.password,
        admin: false,
        messages: []
      });
      
      return newUser.save()
    } else {
      if(user.password !== req.body.password) 
        throw new Error(`Wrong Password`);
      else 
        return user;      
    }
  }).then((user)=>{
    store.usernames[user._id] = {name: user.name, messages:[], id: user._id};
    store.token = jwt.sign(user, `secret`);
    store.usernames[user._id].token = store.token;
    res.send({user, token: store.token});
  }).catch((err)=>{
    res.status('error').send(err);
  });
}