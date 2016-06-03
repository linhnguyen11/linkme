var users = require('../../app/controllers/users.server.controller'),
    articles = require('../../app/controllers/articles.server.controller');
module.exports = function(app) {
    app.route('/api/articles')
        .get(articles.list)
        .post(users.requiresLogin, articles.create);

    app.route('/api/articles/:articleId')
        .get(articles.read)
        .put(users.requiresLogin, articles.hasAuthorization, articles.update)
        .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);
    app.param('articleId', articles.articleByID);
    app.route('/api/categories/:category')
        .get(articles.readCategory);
    app.param('category',articles.articleByCategory);
    app.route('/api/profile/:userId')
        .get(articles.readUser);
    app.param('userId',articles.articleByUser);
};