var express = require('express');
var router = express.Router();
var db = require("../db/db");
var authenticatedMiddleware = require('../config/authMiddleware');

router.get('/', authenticatedMiddleware(), function(req, res, next) {
    db.query('SELECT user_name, current_level FROM tbl_user ORDER BY current_level DESC, time_stamp LIMIT 10', function (err, rows) {
        console.log(`the row is`);
        if (err) throw err;
        else {
            res.render('leaderboard', {leaders: rows});
        }
    });
});

module.exports = router;