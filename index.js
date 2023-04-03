const express = require('express');
const expressLayout = require('express-ejs-layouts');
//mongoose configuation 
const db = require('./config/connect');
//passport for authentication
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');




//session cookie
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');

const dotenv = require('dotenv').config();

const port = process.env.PORT || 8000;

const app = express();


//set up ejs
app.set('view engine', 'ejs');
app.set('views', './views');
//set up express-ejs-layout style and script 
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

app.use(expressLayout);
//access static files
app.use(express.static('./assets'));
//form data convet into json format 
app.use(express.urlencoded({ extended: false }));

//session cookie
app.use(expressSession({
    name: "TaskManager",
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 100 * 60
    },
    //store session cookie in DB
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/BosonTechAi',
        autoRemove: false
    }, function (err) {
        console.log(err || "connect");
    })
}))

//setup passport
app.use(passport.initialize());
app.use(passport.session());
//set authenticated user in response for views
app.use(passport.setAuthenticatedUser);



//handle urls
app.use('/', require('./routes/index.js'));

//listen
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server is up on port ${port}`);
})