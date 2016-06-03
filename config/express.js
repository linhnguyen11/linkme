var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport');
//var multer  = require('multer');


module.exports = function() {
	var app = express();
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
		console.log('Dev Mode');
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
		console.log('Product Mode');
	}
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));
	app.use(express.static('./public'));
	app.set('views', './views');
	app.set('view engine', 'ejs');
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	//require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/articles.server.routes.js')(app)
	require('../app/routes/news.server.routes.js')(app)

	//app.use(multer({ dest: './uploads/',
	//	rename: function (fieldname, filename) {
	//		return filename+Date.now();
	//	},
	//	onFileUploadStart: function (file) {
	//		console.log(file.originalname + ' is starting ...');
	//	},
	//	onFileUploadComplete: function (file) {
	//		console.log(file.fieldname + ' uploaded to  ' + file.path)
	//	}
	//}));
	//app.use(multer({
    //
	//	dest: './uploads/'
    //
	//}));
	require('../app/routes/upload.server.routes.js')(app);
	return app;
};