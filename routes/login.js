var express = require('express');
var router = express.Router();
var passport = require('passport');
var request = require('request');
var onAnswer = require('../config/onAnswer');

function alreadyAuthenticatedMiddleware() {
  return function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/resume');
  }
}

router.get('/', alreadyAuthenticatedMiddleware(), function (req, res, next) {
  res.render('login', { loginMessage: req.flash('loginMessage') });
});

router.post('/', onAnswer.isBanned(), function (req, res, next) {
  
  var secretKey = "6LeqdrwUAAAAADbq5M3K2zXg411BbiDVNjDWLC3p";
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.recaptcha + "&remoteip=" + req.connection.remoteAddress;
  request(verificationUrl, function (error, response, body) {
    body = JSON.parse(body);
    if (body.success) {
      req.checkBody('email', 'Invalid email').isEmail();
      req.checkBody('password', 'Invalid password').isLength({ min: 5 });
      var errors = req.validationErrors();
      if (errors) {
        req.flash('loginMessage', errors[0].msg);
        return res.redirect('/login');
      }
      passport.authenticate('local', function (err, user) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('login'); }
        req.logIn(user, function (err) {
          if (err) { return next(err); }
          return res.redirect('resume');
        });
      })(req, res, next);
    }
    else {
      req.flash('loginMessage', 'Captcha invalid.');
      return res.redirect('login');
    }
  });
});

module.exports = router;
