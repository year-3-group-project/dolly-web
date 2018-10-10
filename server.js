var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var admin = require('firebase-admin');

var serviceAccount = require('./dolly-e7b16-firebase-adminsdk-v6f4l-b15c41058b');

var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://dolly-e7b16.firebaseio.com/'
});

var database = firebaseAdmin.database();

// Create instance of express app
var app = express();

// We want to serve JS and HTML in EJS
// EJS stands for embedded JavaScript
app.set('view engine', 'ejs');

// We also want to send css, images and other static sites.
app.use(express.static('views'));
app.set('views', __dirname + '/views');

// Give the server access to the user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));

// Create authentication middleware
function isAuthenticated(req, res, next) {
    // Check if user is logged in
    // if they are, attach them to the request object
    // if they are not, send them to the login
    // with the message saying: "login"
}

app.get('/', function (req, res) {
    var restaurantsRef = database.ref('/restaurants');

    restaurantsRef.once('value', function (snapshot) {
        var data = snapshot.val();
        if (!data) {
            data = {}
        }

        res.render('home.ejs', {restaurants: snapshot.val()});
    });
});



app.post('/', function(req, res) {
    // var breakfast = req.body.breakfast;
    // // Send back a page with the yelled breakfast on it.
    // res.render('results.ejs', { data: breakfast });
});

app.listen(3030, function() {
    console.log('App running at port 3030');
});