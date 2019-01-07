const User = require('../models/user/schema');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.user_register = function (req, res, next) {
    let user = new User(
        {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User registered successfully')
    })
};

exports.user_login = function (req, res, next) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
          });
        }
    ));
}

