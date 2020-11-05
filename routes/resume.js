var express = require('express');
var router = express.Router();
var db = require('../db/db');
var authenticatedMiddleware = require('../config/authMiddleware');

router.get('/', authenticatedMiddleware(), function (req, res, next) {
    const uid = req.session.passport.user.user_id;
    db.query('SELECT current_level, route FROM tbl_user, level_route WHERE level=current_level and user_id = ?', [uid], function (err, rows) {
        if (err) throw err;
        res.redirect(rows[0].route);
    });
});

module.exports = router;
