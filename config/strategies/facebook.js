var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');
module.exports = function() {
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;
            console.log(profile);
            var providerUserProfile = {
                //firstName: profile.name.givenName,
                //lastName: profile.name.familyName,
                firstName: profile.displayName,
                lastName: '',
                //email: profile.emails[0].value,
                username: profile.username,
                photos: "http://graph.facebook.com/" + profile.id + "/picture/?type=large",
                provider: 'facebook',
                providerId: profile.id,
                providerData: providerData
            };

            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }));
};