var express = require('express');
var router = express.Router();

function alreadyAuthenticatedMiddleware() {
	return (req, res, next) => {
		if(!req.isAuthenticated()) {
			return next();
		}
		res.redirect('/resume');
	}
}
/* GET home page. */
router.get('/', alreadyAuthenticatedMiddleware(), function(req, res, next) {
  	res.render('landing');
});

module.exports = router;