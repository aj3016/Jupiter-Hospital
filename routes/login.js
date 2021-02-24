var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var router = express.Router();


/* GET login page. */
router.get('/', authenticationMiddleware(),function(req, res, next) {
  res.render('login',{
    isAuthenticated: req.isAuthenticated(),
    message: req.flash('error')
  });
});

router.post('/enter', passport.authenticate('local',{
  successRedirect:'/dashboard',
  failureRedirect:'/login',
  failureFlash: true
}))

passport.serializeUser(function(reg_id, done) {
  done(null, reg_id);
});

passport.deserializeUser(function(reg_id, done) {
  done(null, reg_id);
});

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: You are Already Logged in`);

	    if (!req.isAuthenticated()) return next();
	    res.redirect('/dashboard')
	}
}

module.exports = router;
