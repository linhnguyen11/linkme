var users = require('../../app/controllers/users.server.controller'),
    news = require('../../app/controllers/news.server.controller');
module.exports = function(app) {
    app.route('/api/news')
        .get(news.list)
        .post(users.requiresLogin, news.create);

    app.route('/api/news/:newId')
        .get(news.read)
        .put(users.requiresLogin, news.hasAuthorization, news.update)
        .delete(users.requiresLogin, news.hasAuthorization, news.delete);
    app.param('newId', news.newByID);
    app.route('/api/categories/:category')
        .get(news.readCategory);
    app.param('category',news.newByCategory);
    app.route('/api/profile/:userId')
        .get(news.readUser);
    app.param('userId',news.newByUser);
};