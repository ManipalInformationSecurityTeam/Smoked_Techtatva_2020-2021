var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var db = require("../db/db");

module.exports = function (passport) {

    passport.serializeUser(function (user_id, done) {
        done(null, user_id);
    });

    passport.deserializeUser(function (user_id, done) {
        done(null, user_id);
    });


    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            db.query("SELECT * FROM tbl_user WHERE user_email = ?", [email], function (err, rows) {
                if (err)
                    return done(err);
                if (rows.length === 0) {
                    return done(null, false, req.flash('loginMessage', 'User not found.'));
                }
                const hash = rows[0].user_password;

                bcrypt.compare(password, hash, function (err, response) {
                    if (response === true) {
                        return done(null, { user_id: rows[0].user_id });
                    } else {
                        return done(null, false, req.flash('loginMessage', 'Check email or password.'));
                    }
                });
            });
        })
    );

};