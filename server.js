import express from 'express'
import ConnectDB from './connect.js'
import dotenv from 'dotenv'
import ejs from 'ejs'
import  Routes from './routes/dashboard.js'
import bodyParser from "body-parser";
import passport from 'passport';
import flash from 'connect-flash';
import session from 'express-session'
import UserRoutes from "./routes/auth.js"
import passportconfig from './config/passport.js'


dotenv.config()
passportconfig(passport);


const app = express()
ConnectDB()

app.use(express.json())
app.set('view engine', 'ejs');




app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('frontend'));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes

app.use('/users', UserRoutes);
app.use('/', Routes);

app.listen(8001 , () => {
  console.log("Server is Listening on 8001");
})