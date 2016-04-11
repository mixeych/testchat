module.exports.get = function(req, res, next) {
    res.render('login');
}
var User = require('../models/user').User;
var message;
module.exports.post = function(req, res, next){
    res.render('login', {name: req.body.name, password: req.body.password});
    User.findOne({email: name}, function(err, user){
        if(err){
            return next(err);
        }
        if(user){
            if(user.checkPassword(req.body.password)){
                req.session.user = user._id;
                res.end();
            }else{
                message = "login or password incorrect";
                res.render('login', {message: message});
            }
        }else{
            message = "login or password incorrect";
            res.render('login', {message: message});
        }
    });
}
