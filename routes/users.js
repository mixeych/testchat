var User = require('../models/user').User;
ObjectID = require('mongodb').ObjectID;
var users = {};
users.all = function(req, res, next) {
    User.find({}, function(err, users){
        if(err){
           return next(err);
        }
        res.json(users);
    });
}

users.one = function(req, res, next) {

    try{
        var id = new ObjectID(req.params.id); // преобразование параметра id в objectID

    }catch(err){
        err.message = 'bad objectid';
        throw err;
    }
    User.findById(id, function(err, users){
        if(err){
            err.message = 'bad id format';
            return next(err);
        }
        if(!users){
            console.log(3);
            err.message = 'user not found';
            return next(err);
        }
        res.json(users);
    });
}


module.exports = users;