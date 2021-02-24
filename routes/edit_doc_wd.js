var express = require('express');
var router = express.Router();

router.get('/:id', authenticationMiddleware(), s1, s2, function(req, res, next) {
    
});

function s1 (req,res,next){
    var userid = req.params.id;
    var sql = `select * from doctor_work_details where reg_id = '${userid}'`
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

function s2(req,res,next){
    res.render('edit_work',{
        work : req.q1,
        isAuthenticated: req.isAuthenticated(),
    })
}

router.post('/put/:id', authenticationMiddleware() ,function(req, res, next) {
    var reg_id = req.params.id;
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
    console.log(medical_colleges);

    var sql = ` update doctor_work_details set degree = '${degree}', specialization = '${specializations}', weekday_from = '${from_wd}', weekday_to = '${to_wd}', sat_from = '${from_sat}', sat_to = '${to_sat}', sun_from = '${from_sun}', sun_to = '${to_sun}', exp = ${exp}, medical_college = '${medical_colleges}' where reg_id = ${reg_id}`;

    conn.query(sql,function (err, data) { 
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