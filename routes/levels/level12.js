var express = require('express');
var router = express.Router();
var authenticatedMiddleware = require('../../config/authMiddleware');
var onAnswer = require('../../config/onAnswer');
const level = 12;  //change level here
var levelpassed = "Smoked | Level " + level;
var message = "Wrong Answer";

router.get('/', authenticatedMiddleware(), onAnswer.currentLevel(level), function (req, res) {
    res.render('levels/level' + level, {level: levelpassed});
});

router.get('/:answer', authenticatedMiddleware(), onAnswer.currentLevel(level), onAnswer.insertIntoLog(level), function (req, res, next) {
    const uid = req.session.passport.user.user_id;
    if (req.params.answer.toLowerCase() === 'spectre') { //answer
        onAnswer.updateUserLevel(uid, level+1)
        .then(function() {
            res.redirect('/12.31.99'); //change redirection link
        })
        .catch(function(error) {
            throw error;
        });
    }
    //else if close answer message template
    else {
        res.render('message',{message: message});
    }
});

module.exports = router;