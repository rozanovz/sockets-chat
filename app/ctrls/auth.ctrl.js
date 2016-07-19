const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
      if(user.password !== req.body.password) return `Wrong Password`;
      else return {user, token: jwt.sign(user, `secret`)};      
    }
  }).then((r)=>{
    res.send('success');
  }).catch((err)=>{
    console.log(err);
  });
}