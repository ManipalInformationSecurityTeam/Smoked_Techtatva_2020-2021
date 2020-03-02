var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var request = require('request');
var nodemailer = require('nodemailer');
var db = require('../db/db');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
      host: 'smtp.gmail.com',
    auth: {
      user: 'smoked.turing@gmail.com',
      pass: 'sudo7777root'
    }
  });

router.get('/', function(req, res, next) {
  res.render('forgot', { loginMessage: req.flash('loginMessage') });
});

router.post('/sendCode', function(req, res, next) {
    var code = Math.floor(100000 + Math.random() * 900000);
    const email = req.body.email;
    var secretKey = "6LeqdrwUAAAAADbq5M3K2zXg411BbiDVNjDWLC3p";
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.recaptcha + "&remoteip=" + req.connection.remoteAddress;
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        if (body.success) {
            db.query('SELECT user_id from tbl_user where user_email = ?', [email], function(err, result, fields) {
                if (err) throw err;
                if (result.length === 1) {
                    var mailOptions = {
                        from: 'Smoked',
                        to: email,
                        subject: 'Reset Password',
                        text: 'Your verification PIN is : ' + code
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                console.log(error);
                                res.render('error', {errorStatus: 500, errorMessage: 'Could not send email'});
                            } 
                            else {
                                console.log('Email sent: ' + info.response);
                                var timeNow = new Date().toISOString().split('.')[0];
                                db.query('INSERT into verify_code (email, code, timestamp) values (?, ?, ?)', [email, code, timeNow], function(er, resl, field) {
                                    if (err) throw err;
                                    res.render('verify', {loginMessage: ''});
                                });
                            }
                        });
                }
                else {
                    res.render('forgot', {loginMessage: 'User not registered.'});
                }
            
            }); 
        }
        else {
            res.render('forgot', {loginMessage: 'Invalid captcha.'});
        }
    });

});

router.post('/verifyCode', function(req, res, next) {
    var data = req.body.pin;
    var email = req.body.email;
    var password = req.body.password;
    var c_password = req.body.c_password;
    if(password.length<5){
        res.render('verify',{loginMessage: 'Password is too short'});
    }
    else if(password !== c_password) {
        res.render('verify', {loginMessage: 'Passwords do not match'});
    }
    else{
        db.query('SELECT * from verify_code where email = ? order by timestamp DESC limit 1', [email], function(er, results, fields) {
            if (er) throw er;
            if (results.length === 1) {
                if (results[0].code == data) {
                    bcrypt.hash(password, 10, function(e, hash) {
                        if (e) throw e;
                        db.query('UPDATE tbl_user SET user_password = ? where user_email = ?', [hash, email], function(error1, results1, fields1) {
                            if (error1) throw error1;
                            db.query('DELETE FROM verify_code where email = ?', [email], function(error2, result2, field2) {
                                if (error1) throw error1;
                                res.redirect('/login');
                            });
                        });
                    });
                }
                else {
                    req.flash('loginMessage', 'Code invalid. Try again');
                    res.redirect('/forgot');
                }
            }
            else {
                res.render('verify', {loginMessage: 'Invalid values'});
            }
        });
    }
    
});

module.exports = router;
