var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET login page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {
  res.render('regpat',{errors:0,isAuthenticated: req.isAuthenticated()});
});

router.post('/save', fuc, function(req, res, next) {
  

  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  //req.checkBody('mobile_no', 'Mobile Number must be 10 characters long.').matches(/[^0-9][+-]?[0-9]{1,10}[^0-9]/);

  const errors = req.validationErrors();

  var hell = req.x;

  if(errors){
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.render('regpat',{
      title: 'registration error',
      errors: errors,
      isAuthenticated: req.isAuthenticated()});
  }else if(hell.length===1){
    if(hell[0].username===req.body.email){
      var shh = [{
        location: "body",
        param: "username",
        msg:
          "The username you entered is already in use, please choose a different once.",
        value: hell[0].username
      }];
      res.render('regpat',{
        title: 'registration error',
        errors: shh,
        isAuthenticated: req.isAuthenticated()});
    }
  }
  else{
  // store all the user input data
  var title = req.body.title;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var password = req.body.password;
  var dob = req.body.dob;
  var age = `floor(DATEDIFF(current_date(),'${dob}')/365.25)`;
  var mobile_no = req.body.phone;
  var s1 = req.body.s1;
  var s2 = req.body.s2;
  var city = req.body.city;
  var zip = req.body.zip;
  var country = req.body.country;
  var gender = req.body.gender;
  var bg = req.body.bg;
  var weight = req.body.weight;
  var height = req.body.height;
  var allergies = req.body.allergies;


  //var sql1 = `insert into patient_login(username,pwd) values ('${email}','${hash}')`;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    var sql1 = `insert into patient_login(username,pwd) values ('${email}','${hash}')`;

    conn.query(sql1,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully "); 
    });

    var sql0 = `insert into pat_age(dob,age) values ('${dob}',${age})`;

    conn.query(sql0,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully "); 
    });

    var sql2 = `insert into patient_personal_details(title,fname,lname,mobile_no,email,s1,s2,city,pc,country) values ('${title}','${fname}','${lname}','${mobile_no}','${email}','${s1}','${s2}','${city}','${zip}','${country}')`;

    conn.query(sql2,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully "); 
    });


    var sql3 = `insert into patient_medical_details(gender,bg,weight,height,allergies) values ('${gender}','${bg}','${weight}','${height}','${allergies}')`;

    conn.query(sql3,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully "); 
      res.redirect("/login");
    });
  });
  }
});

function fuc(req,res,next){
  var email = req.body.email;
  var cc = `select * from patient_login where username = '${email}'`;
  conn.query(cc, function (err, result, fields) {
    if (err)
    console.log("[mysql error]",err);
    else{
      console.log(result);
      req.x = result;
      return next();
    }
  });
}

function authenticationMiddleware() {  
  return (req, res, next) => {
    console.log(`req.session.passport.user: You are Already Registered`);

      if (!req.isAuthenticated()) return next();
      res.redirect('/dashboard')
  }
}

module.exports = router;
