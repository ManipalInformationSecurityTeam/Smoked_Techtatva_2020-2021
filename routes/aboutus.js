var express = require('express');
var router = express.Router();
var authenticatedMiddleware = require('../config/authMiddleware');

router.get('/', authenticatedMiddleware(), function(req, res, next) {
  res.render('aboutus');
});

module.exports = router;