var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var mysql = require('mysql'); 
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var regpatRouter = require('./routes/regpat');
var regdocRouter = require('./routes/regdoc');
const { options } = require('./routes/regpat');

var dashboardRouter = require('./routes/dashboard');
var timeRouter = require('./routes/time');
var docshowRouter = require('./routes/patd');

var editregpatRouter = require("./routes/edit_pat_pd");
var editregdocRouter = require("./routes/edit_doc_pd");
var editmeddatRouter = require("./routes/edit_pat_md");
var editworkdatRouter = require("./routes/edit_doc_wd");

var downloadRouter = require('./routes/download');

var app = express();

const port = 5500;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var option ={
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: '',      // Replace with your database password
  database: 'Jupiter_Hospital' // // Replace with your database Name
}; 

var sessionStore = new MySQLStore(option);

app.use(session({
  secret: 'nljkbhvutcyrctuvbisecvcf',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  //cookie: { secure: true }
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client    
app.use(expressValidator([options]));        
app.use(fileUpload()); // configure fileupload


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/patient/register',regpatRouter);
app.use('/doctor/register',regdocRouter);
app.use('/dashboard',dashboardRouter);
app.use('/dashboard/slots',timeRouter);
app.use('/dashboard/patd',docshowRouter);
app.use('/patient/editpd',editregpatRouter);
app.use('/doctor/editpd',editregdocRouter);
app.use('/patient/editmd',editmeddatRouter);
app.use('/doctor/editwd',editworkdatRouter);
app.use('/download',downloadRouter);

var u;
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  },
  function(req,username, password, done) {
    u=req.body.user;
    app.set('u', u);
    console.log(u);
    console.log(username);
    console.log(password);

    var conn = mysql.createConnection({
      host: 'localhost', // Replace with your host name
      user: 'root',      // Replace with your database username
      password: '',      // Replace with your database password
      database: 'Jupiter_Hospital' // // Replace with your database Name
    }); 

    var pf = `select reg_id,pwd from ${u} where username = '${username}'`;
    console.log(pf);
    conn.query(pf,function(err,results,fields){
      if(err){done(err)};
      if(results.length===0){done(null,false,{message:"Incorrect Username or Password"})}
      else{
          console.log(results[0].pwd);
          console.log(results[0].reg_id);
          const hash = results[0].pwd;
          bcrypt.compare(password,hash,function(err,response){
            if(response===true){
              return done(null, {reg_id: results[0].reg_id});}
            else{
              return done(null,false,{message:"Incorrect Username or Password"});
          }
        })
      }
    });
  }
));

var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: '',      // Replace with your database password
  database: 'Jupiter_Hospital' // // Replace with your database Name
}); 

conn.connect(function(err) {
  if (err)
   console.log("[mysql error]",err);
  console.log('Database is connected successfully !');
});
global.conn=conn

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
