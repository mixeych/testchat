var User = require('../models/user').User;
ObjectID = require('mongodb').ObjectID;

module.exports = function(app){
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  app.get('/users', function(req, res, next) {
    User.find({}, function(err, users){
      if(err){
        next(err);
      }
      res.json(users);
    });

  });
  app.get('/login', function(req, res, next) {
      res.render('login');
  });
    
    app.get('/register', function(req, res, next) {
      res.render('register');
  });

    app.post('/login', function(req, res, next){
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
    });
    
    app.post('/register', function(req, res, next){
        
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var message;
        User.findOne({email: email}, function(err, user){
            if(err){
                next(err);
            }
            if(user){
                message = "you already registered";
                res.render('register', {message: message});
            }else{
                User.findOne({name: name}, function (err, us){
                    if(us){
                        message = "username is occupied";
                        res.render('register', {message: message});
                        return;
                    }
                    if(err){
                        next(err);
                    }
                    var user = new User({
                        username: name,
                        email: email,
                        password: password
                    });
                    user.save(function(err, user){
                        if(err){
                            next(err);
                        }
                        message = "you have registered succesful";
                        res.render('register', {message: message});

                    });
                });
            }
        });

    });

  app.get('/user/:id', function(err, req, res, next) {
     try{
         var id = new ObjectID(req.params.id); // преобразование параметра id в objectID
     }catch(e){
         next();
     }
    User.findById(id, function(err, users){
      if(err){
          err.message = 'bad id format';
          next(err);
      }
      if(!users){
          err.message = 'user not found';
          next(err);
      }
      res.json(users);
    });

  });



};
