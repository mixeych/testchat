var register = {};
var async = require('async');
register.get = function(req, res, next) {
    res.render('register');
}
var User = require('../models/user').User;

register.post = function(req, res, next){

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var message;

    async.waterfall([
        function(callback){
            User.findOne({email: email}, callback);
        },
        function (user, callback){
            if(user){
                message = "you already registered";
                res.render('register', {message: message});
                return;
            }else{
                User.findOne({username: name}, callback);
            }
        },
        function (user, callback){
            if(user){
                message = "username is occupied";
                res.render('register', {message: message});
                return;
            }else{
               callback(null);
            }
        }
    ], function(err){
            if(err) {
                return next(err);
            }
            var user = new User({
                username: name,
                email: email,
                password: password
            });
            user.save(function(err, user){
                if(err){
                    return next(err);
                }
                message = "you have registered succesful";
                res.render('register', {message: message});

            });
        }
    );
}

module.exports = register;
