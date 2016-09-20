var express = require('express'),
    app = express(),

    mongoose = require('mongoose'),
    auth = require('./server/controllers/auth.js'),
    passport = require('passport'),
    session = require('express-session'),

    bodyParser = require('body-parser'),

    errorHandler = require('./server/errors/errorHandler.js'),
    errorLogger = require('./server/errors/errorLogger.js'),

    routes = require('./server/routes/routes.js'),

    cookieParser = require('cookie-parser');

//TODO: Избавиться от хардкода(сделать конфиг)
mongoose.connect('mongodb://localhost/lenka');

app.use(cookieParser());
app.use(session({
    secret: 'appsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: new Date(Date.now() + 3600000)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', routes.router);

app.set('view engine', 'jade');
app.set('views', './client/pages');


app.use(errorLogger);
app.use(errorHandler);
app.use(express.static(__dirname + '/dist'));

//already last(error processing)
app.use(function (req, res) {
    res.render('404');
});

var server = app.listen(process.env.PORT || 3000, '0.0.0.0', function () {
    console.log('Working ' + this.port);
});
