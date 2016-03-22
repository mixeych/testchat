var User = require('./models/user').User;
var mongoose = require ('./libs/mongoose');
mongoose.set("debug", true);
var async = require('async');

async.series([
    openConnection,
    dropDatabase,
    createUsers,
    closeDatabase
],
// optional callback
function(err, results){
    if(err){
        throw err;
    }
    console.log(results);
});

function openConnection(callback){
    mongoose.connection.on("open", callback);
}

function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function createUsers(callback){
    async.parallel([
        function(callback){
            var user1 = new User({
                username: "vasya",
                password: "1111"
            });
            user1.save(function(err, user1){
                if(err){
                    throw err;
                }
                callback(null, user1);
            });
        },
        function(callback){
            var user2 = new User({
                username: "kolya",
                password: "1234"
            });
            user2.save(function(err, user2){
                if(err){
                    throw err;
                }
                callback(null, user2);
            });
        },
        function(callback){
            var user3 = new User ({
                username: "petya",
                password: "1111"
            });
            user3.save(function(err, user3){
                if(err){
                    throw err;
                }
                callback(null, user3);
            });
        }
    ],callback);
}

function closeDatabase(callback){
    mongoose.disconnect(); // помещается в колллбек dropDatabase и коллбэк async
    console.log(callback);
}

