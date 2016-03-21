var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.get('db'));

module.exports = mongoose;