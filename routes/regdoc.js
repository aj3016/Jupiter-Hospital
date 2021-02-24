var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;


/* GET login page. */
router.get('/',function(req, res, next) {
  res.render('regdoc',{errors:0,isAuthenticated: req.isAuthenticated()});
});

module.exports = router;

router.post('/save', fuc, authenticationMiddleware() ,function(req, res, next) {
  
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  //req.checkBody('mobile_no', 'Mobile Number must be 10 characters long.').matches(/[^0-9][+-]?[0-9]{1,10}[^0-9]/);

  const errors = req.validationErrors();
  var hell = req.x;
  
  if(errors){
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.render('regdoc',{
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
      res.render('regdoc',{
        title: 'registration error',
        errors: shh,
        isAuthenticated: req.isAuthenticated()});
    }
  }
  else{

  // store all the user input data
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var password = req.body.password;
  var dob = req.body.dob;
  var age = `floor(DATEDIFF(current_date(),'${dob}')/365.25)`;
  var mobile_no1 = req.body.phone1;
  var mobile_no2 = req.body.phone2;
  var s1 = req.body.s1;
  var s2 = req.body.s2;
  var city = req.body.city;
  var zip = req.body.zip;
  var country = req.body.country;
  var degree = req.body.degree;
  var specializations = req.body.specializations;
  var from_wd = req.body.from_wd;
  var to_wd = req.body.to_wd;
  var from_sat = req.body.from_sat;
  var to_sat = req.body.to_sat;
  var from_sun = req.body.from_sun;
  var to_sun = req.body.to_sun;
  var exp = req.body.exp;
  var medical_colleges = req.body.medical_colleges;
 
  //var sql1 = `insert into doctor_login(username,pwd) values ('${email}','${password}')`;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    var sql1 = `insert into doctor_login(username,pwd) values ('${email}','${hash}')`;

    conn.query(sql1,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully "); 
    });
  
    var sql0 = `insert into doc_age(dob,age) values ('${dob}',${age})`;

    conn.query(sql0,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully "); 
    });

  
    var sql2 = `insert into doctor_personal_details(fname,lname,mobile_no,Emobile_no,email,s1,s2,city,pc,country) values ('${fname}','${lname}','${mobile_no1}','${mobile_no2}','${email}','${s1}','${s2}','${city}','${zip}','${country}')`;

    conn.query(sql2,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully "); 
    });

    var sql3 = `insert into doctor_work_details(degree,specialization,weekday_from,weekday_to,sat_from,sat_to,sun_from,sun_to,exp,medical_college) values ('${degree}','${specializations}','${from_wd}','${to_wd}','${from_sat}','${to_sat}','${from_sun}','${to_sun}','${exp}','${medical_colleges}')`;

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
  var cc = `select * from doctor_login where username = '${email}'`;
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
    console.log(`req.session.passport.user: You are Already Registered `);

      if (!req.isAuthenticated()) return next();
      res.redirect('/dashboard')
  }
}

module.exports = router;
