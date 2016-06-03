var mongoose = require('mongoose'),
    New = mongoose.model('New');
var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};
exports.create = function(req, res) {
    var tao = new New(req.body);
    tao.creator = req.user;
    tao.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(tao);
        }
    });
};
exports.list = function(req, res) {
    New.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, news) {
    if (err) {
        return res.status(400).send({
        message: getErrorMessage(err)
    });
    } else {
        res.json(news);
    }
});
};
exports.newByCategory = function(req, res, next, category){
    New.find().where('category').equals(category).sort('-created').populate('creator','firstName lastName fullName').exec(function(err,news){
        if (err) return next(err);
        if (!news) return next(new Error('Failed to load new in ' + category));
        req.news = news;
        next();
    });
}
exports.readCategory = function(req,res){
    res.json(req.news);
};
exports.newByUser = function(req, res, next, user){
    New.find().where('creator').equals(user).sort('-created').populate('creator','firstName lastName fulName').exec(function(err,news){
        if(err) return next(err);
        if(!news) return next(new Error('Failed to load new by ' + user));
        req.news = news;
        next()
    });
}
exports.readUser = function(req, res){
    res.json(req.news);
}
exports.newByID = function(req, res, next, id) {
    New.findById(id).populate('creator', 'firstName lastName fullName role').exec(function(err, news){
    if (err) return next(err);
    if (!news) return next(new Error('Failed to load news ' + id));
    req.news = news;
    next();
});
};
exports.read = function(req, res) {
    res.json(req.news);
};
exports.update = function(req, res) {
    var news = req.news;
    news.title = req.body.title;
    news.content = req.body.content;
    news.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(news);
        }
    });
};
exports.delete = function(req, res) {
    var news = req.news;
    news.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(news);
        }
    });

};

exports.hasAuthorization = function(req, res, next) {

    if (req.news.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'New is not authorized'
        });
    }
    next();
};