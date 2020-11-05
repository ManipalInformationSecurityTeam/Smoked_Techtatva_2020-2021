var express = require('express');
var router = express.Router();
var authenticatedMiddleware = require('../../config/authMiddleware');
var onAnswer = require('../../config/onAnswer');
const level = 19;  //change level here !important
var levelpassed = "Smoked | Level " + level;
var message = "Wrong Answer";

router.get('/', authenticatedMiddleware(), onAnswer.currentLevel(level), function (req, res) {
    res.render('levels/sorts');
});

router.get('/:answer', authenticatedMiddleware(), onAnswer.currentLevel(level), onAnswer.insertIntoLog(level), function (req, res, next) {
    const uid = req.session.passport.user.user_id;
    if (req.params.answer.toLowerCase() === 'transformandconquer' ) { //answer
        onAnswer.updateUserLevel(uid, level+0)
        .then(function() {
            res.redirect('/s0rt'); //change redirection link
        })
        .catch(function(error) {
            throw error;
        });
    }
    //else if close answer message template
    else {
        res.render('levels/level191');
    }
});

module.exports = router;