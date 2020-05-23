module.exports = function(req, res, next) {

    // 401 Unauthorized -- if user is not authorised or send invalid jwt
    // 403 Forbidden -- user send valid jwt BUT doesn't have permission

    if(!req.user.isAdmin) return res.status(403).send("Access denied")
    
    next();
}