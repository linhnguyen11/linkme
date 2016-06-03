var users = require('../controllers/users.server.controller'),
    passport = require('passport');
module.exports = function(app) {
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.get('/signout', users.signout);
    app.get('/oauth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/oauth/facebook/callback', passport.authenticate('facebook',
        {
            failureRedirect: '/signin',
            successRedirect: '/'
        }));
    app.route('/api/users')
        .post(users.create)
        .get(users.list);
    app.route('/api/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);
    app.param('userId', users.userByID);
};