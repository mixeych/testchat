module.exports = function(req, res, next){
    if(!req.session.user){
        var err = new Error('Not authorized');
        err.status = "403";
        return next(err);
    }
    next();
}
