var frontPage = require('./frontpage');
var users = require('./users');
var login = require('./login');
var register = require('./register');

module.exports = function(app){

    app.get('/', frontPage);

    app.get('/users', users.all);

    app.get('/user/:id', users.one);

    app.get('/login', login.get);
    
    app.get('/register', register.get);

    app.post('/login', login.post);
    
    app.post('/register', register.post);
    
}
