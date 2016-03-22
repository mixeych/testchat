var util = require('util');
var http = require('http');
function CustomError(status, message){
    Error.apply(this, arguments);
    Error.captureStackTrace(this, CustomError);
    this.status = status;
    this.message = message||http.STATUS_CODES[status]||'Error';
}
util.inherits(CustomError, Error);
CustomError.prototype.name = "CustomError";

exports.CustomError = CustomError;