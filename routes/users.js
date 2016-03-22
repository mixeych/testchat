var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users){
    if(err){
      next(err);
    }
    res.json(users);
  });

});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  User.findById(id, function(err, users){
    if(err){
      res.render('error', {
        message: 'bad id format',
        error: err
      });
    }
    if(!users){
      res.render('error', {
        message: 'user not found',
        error: err
      });
    }
    res.json(users);
  });

});

module.exports = router;
