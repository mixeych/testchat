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

    app.post('/login', function(req, res, next){
        res.render('login', {name: req.body.name, password: req.body.password});
        User.findOne({username: name}, function(err, user){
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
