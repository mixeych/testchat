var User = require('./models/user').User;
var db = require('mongodb');
var user = new User({
    username: 'Vasya',
    password: '111'
});

/*user.save(function (err, user, affected){
    if(err){
        throw err
    }
    User.findOne({})
});*/

User.findOne({username: 'Vasya'}, function (err, res){
    if(err){
        throw err;
    }
    console.log(res);
});