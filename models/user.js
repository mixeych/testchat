var mongoose = require('../libs/mongoose');
const crypto = require('crypto');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {
        type: String,
        reuired: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        reuired: true
    },
    email: {
        reuired: true,
        unique: true,
        type: String
    },
    createdAt: {
        type: String,
        date: Date.now()
    }
});

userSchema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}

userSchema.virtual('password').set(function(password){
    this._plainPassword = password;
    this.salt = Math.random()+'';
    this.hashedPassword = this.encryptPassword(password)
}).get(function(){ return this._plainPassword });

userSchema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword
}


exports.User = mongoose.model('User', userSchema);
