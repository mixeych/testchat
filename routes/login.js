module.exports.get = function(req, res, next) {
    res.render('login');
}

module.exports.post = function(req, res, next){
    res.render('login', {name: req.body.name, password: req.body.password});
    User.findOne({email: name}, function(err, user){
        if(user){
            if(user.checkPassword(req.body.password)){
                // 200 ок
            }else{
                // 403 forbidden
            }
        }else{
            // user not found
        }
    });
}
