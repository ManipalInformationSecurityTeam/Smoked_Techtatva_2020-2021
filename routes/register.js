var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var request = require('request');
var db = require("../db/db");

function alreadyAuthenticatedMiddleware() {
  return function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/resume');
  }
}

router.get('/', alreadyAuthenticatedMiddleware(), function (req, res, next) {
  res.render('register', { registerMessage: req.flash('registerMessage') });
});
router.post('/', alreadyAuthenticatedMiddleware(), function (req, res, next) {

  var secretKey = "6LdvBd8ZAAAAAD4SeM0MDBawowcv7mz8ma5w68kX";
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.recaptcha + "&remoteip=" + req.connection.remoteAddress;
  request(verificationUrl, function (error, response, body) {
   
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Invalid password').isLength({ min: 5, max: 40 });
    req.checkBody('username', 'Invalid username').isLength({ min: 5, max: 40 });
    req.checkBody('college', 'Invalid college').isLength({ min: 2, max: 40 });
    req.checkBody('name', 'Invalid name').isLength({ min: 3, max: 40 });
    req.checkBody('regno', 'Invalid regno').isLength({ min: 6, max: 12 });
    req.checkBody('phone', 'Invalid phone number').isLength({ min: 10, max: 10});
    req.sanitize('username').escape();
    var errors = req.validationErrors();
    body = JSON.parse(body);
	console.log(body);
    if (errors) {
      req.flash('registerMessage', errors[0].msg);
      return res.redirect('/register');
    }
    if (req.body.name && req.body.username && req.body.email && req.body.password && req.body.regno &&
      req.body.phone && req.body.college && body.success) {
      //bcrypt salt rounds and constants
      const saltRounds = 10;
      const myPlaintextPassword = req.body.password;
      // const someOtherPlaintextPassword = 'not_bacon';
      db.query('SELECT * FROM tbl_user WHERE ( user_email = ? ) or ( user_name = ? )', [req.body.email, req.body.username], function (er, result, fields) {
        if (er)
          throw er;
        if (result.length > 0) {
          req.flash('registerMessage', 'Email or username already registered.');
          res.redirect('register');
        } else {
          bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
            if (err)
              throw err;
            // Store hash in your password DB.
            db.query("INSERT INTO tbl_user (name, user_name, user_email, user_password, reg, phone, college, current_level) VALUES (?, ?, ?, ?, ?, ?, ?, 1)", [req.body.name, req.body.username, req.body.email, hash, req.body.regno, req.body.phone, req.body.college], function (err, result) {
              if (err) throw err;

              db.query('SELECT LAST_INSERT_ID() as user_id', function (error, results, fields) {
                if (error) throw error;
                const user_id = results[0];
                req.login(user_id, function (err) {
                  res.redirect('/login');
                });
              });
            });
          });
        }
      });
    } else {
      req.flash('registerMessage', 'Invalid Info or captacha invalid');
      res.redirect('register');
    }
  });
});

module.exports = router;
