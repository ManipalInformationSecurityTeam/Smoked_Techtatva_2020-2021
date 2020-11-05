var db = require('../db/db');
const utf8 = require('utf8');

function insertIntoLog (level) {
    return function(req, res, next) {
        // const username = "utkarsh";
        const username = req.session.passport.user.user_id;
        const uid = req.session.passport.user.user_id;
        var answer = req.params.answer;
        answer = utf8.decode(answer);
        const ip = req.connection.remoteAddress;
        db.query('INSERT INTO answer_logs(user_id,user_name,answer,ip_address,level) VALUES (?,?,?,?,?)', [uid,username, answer, ip, level], function (err, rows) {
            if (err) throw err;
            else {
                next();
            }
        });
    }
}

function updateUserLevel(uid, level) {
    return new Promise(function(resolve, reject) {
        db.query('UPDATE tbl_user SET current_level = ?  WHERE user_id = ?', [level,uid], function (err, rows) {
            if (err) reject(err);
            else {
                resolve(rows);
            }
        });
    });
}

function banUser(uid, reason, time) {
    return new Promise(function(resolve, reject) {
        timeNowOb = new Date();
        startTime = timeNowOb.toISOString().split('.')[0];
        timeNowOb.setHours(timeNowOb.getHours() + time);
        endTime = timeNowOb.toISOString().split('.')[0];
        db.query('INSERT into ban_table(user_id, is_ban, reason, start_time, end_time) values (?,?,?,?,?)', [uid, 1, reason, startTime, endTime], function (err, rows) {
            if (err) reject(err);
            else {
                resolve(rows);
            }
        });
    });
}

function isBanned() {
    return function(req, res, next) {
        db.query('SELECT user_id, is_ban, reason, start_time, end_time from ban_table natural join tbl_user where user_email = ? and is_ban = 1', [req.body.email], function (err, rows) {
            if (err) throw err;
            else {
                timeNow = new Date();
                if (rows.length === 0) {
                    next();
                }
                else if (timeNow >= rows[0].end_time) {
                    //unban
                    db.query('UPDATE ban_table SET is_ban = 0 where user_id = ? and is_ban = 1', [rows[0].user_id], function (errr, row) {
                        if(err) throw err;
                        else {
                            next();
                        }
                    });
                } else {
                    res.render('ban', {message: 'the high septon has banned you for 4 hours for ' + rows[0].reason});
                }
            }
        });
    }
}

function currentLevel(level) {
    return function(req, res, next) {
        const uid = req.session.passport.user.user_id;
        db.query('SELECT current_level FROM tbl_user WHERE user_id = ?', [uid], function (err, rows) {
            if (err) throw err;
            if (rows[0].current_level === level) {
                next();
            } else if (rows[0].current_level > level) {
                res.redirect('/resume');
            } else {
                banUser(uid, 'level jump', 4)
                .then(function() {
                    req.logOut();
                    req.session.destroy();
                    res.render('ban', {message: 'the high septon has you banned for 4 hours for level jump.'});
                })
                .catch(function(err) {
                    throw err;
                });
            }
        });
    }
}

module.exports = {insertIntoLog: insertIntoLog, updateUserLevel: updateUserLevel,
                    currentLevel: currentLevel, banUser: banUser, isBanned: isBanned};