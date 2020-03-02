var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;