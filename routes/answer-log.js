var express = require('express');
var router = express.Router();
var db = require("../db/db");
var authenticatedMiddleware = require('../config/authMiddleware');

router.get('/', authenticatedMiddleware(), function(req, res, next) {
    const uid = req.session.passport.user.user_id;
    db.query('SELECT answer FROM answer_logs where user_id = ? ORDER BY time_stamp DESC LIMIT 10', [uid], function (err, rows) {
        if (err) throw err;
        else {
            res.render('answer-log', {answers: rows});
        }
    });
});

module.exports = router;