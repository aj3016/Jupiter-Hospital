var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
