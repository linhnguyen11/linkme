var config = require('./config.js'),
    mongoose = require('mongoose');
module.exports = function() {
    var db = mongoose.connect(config.db);
    var dbc = mongoose.connection;
    dbc.on('error', console.error.bind(console, 'connection error:'));
    dbc.once('open', function() {
        console.log("DB connect successfully!");
    });
    require('../app/models/user.server.model');
    require('../app/models/article.server.model');
    require('../app/models/new.server.model');
    return db;
};