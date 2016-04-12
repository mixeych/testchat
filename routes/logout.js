module.exports = function(req, res){
    console.log("logout");
    req.session.destroy();
    res.redirect('/');
}
