/**
 * subjectAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.cookies.subjectAuth && req.cookies.subjectAuth.Auth) {
    return next();
  }
  else{
  	// req.cookies.tryPath = req.originalUrl;
  	return res.redirect("/experimentLogin");
  }
};
