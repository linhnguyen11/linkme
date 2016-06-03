process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.set('port', (process.env.PORT || 5000));



// views is directory for all template files
app.get('*', function(req, res, next) {
    if(req.url.indexOf('uploaded')<0){
        aUrl = 'https://www.linkme.vn';
        aImage = 'https://www.linkme.vn/img/adsfuneye.png';
        aContent = 'Kênh tin tức LinkMe';
        res.render('pages/index',{title: 'Link Me', user: JSON.stringify(req.user), image: aImage, content: aContent, url: aUrl, ads: false});
    } else {
        next();
    }

});


// app.get('/', function(req, res) {
//   res.render('pages/index',{title: 'Hello World', user: JSON.stringify(req.user)});
// });
// app.get('/up', function(req, res) {
//     res.render('pages/upload',{title: 'Hello World'});
// });


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


