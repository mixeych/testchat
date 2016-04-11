var User = require('../models/user').User;

module.exports = function(req, res, next){
    if(!req.session.user){
        req.user = res.locals.user = null;
        return next();
    }
    User.findById(req.session.user, function(err, user){
       if(err){
           return next(err);
       }
        req.user = res.locals.user = user; // доступна во всех шаблонах
        next();
    });
}

