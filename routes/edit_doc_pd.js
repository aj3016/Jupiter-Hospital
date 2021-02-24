var express = require('express');
var router = express.Router();

router.get('/:id', authenticationMiddleware(), s1, s2, s3, function(req, res, next) {
    
});

function s1 (req,res,next){
    var userid = req.params.id;
    var sql = `select * from doctor_personal_details where reg_id = '${userid}'`
	console.log(sql);

    conn.query(sql,function (err, result, fields) {
        if (err)
        console.log("[mysql error]",err);
        else{
            console.log(result);
            req.q1=result;
            return next();
        }
    });
}

function s2 (req,res,next){
    var userid = req.params.id;
    var sql = `select * from doc_age where reg_id = '${userid}'`
	console.log(sql);

    conn.query(sql,function (err, result, fields) {
        if (err)
        console.log("[mysql error]",err);
        else{
            console.log(result);
            req.q2=result;
            return next();
        }
    });
}

function s3(req,res,next){
    res.render('edit_doc',{
        personal : req.q1,
        age : req.q2,
        isAuthenticated: req.isAuthenticated(),
    })
}

router.post('/put/:id', authenticationMiddleware() ,function(req, res, next) {
    var reg_id = req.params.id;
    var dob = req.body.dob;
    var age = `floor(DATEDIFF(current_date(),'${dob}')/365.25)`;
    var mobile_no = req.body.phone1;
    var emobile_no = req.body.phone2
    var s1 = req.body.s1;
    var s2 = req.body.s2;
    var city = req.body.city;
    var zip = req.body.zip;
    var country = req.body.country;
    //console.log(reg_id,dob,age,mobile_no,s1,s2,city,zip,country);

    var sql1 = ` update doctor_personal_details set mobile_no = '${mobile_no}', Emobile_no = ${emobile_no}, s1 = '${s1}', s2 = '${s2}', city = '${city}', pc = ${zip}, country = '${country}' where reg_id = ${reg_id}`;

    var sql2 = ` update doc_age set dob = '${dob}', age = ${age} where reg_id = ${reg_id}`;

    conn.query(sql1,function (err, data) { 
        if (err) 
          console.log("[mysql error]",err);
        console.log("User data is updated successfully "); 
    });

    conn.query(sql2,function (err, data) { 
        if (err) 
          console.log("[mysql error]",err);
        console.log("User data is updated successfully "); 
        res.redirect('/dashboard');
      });
});

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}



module.exports = router;