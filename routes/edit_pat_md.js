var express = require('express');
var router = express.Router();

router.get('/:id', authenticationMiddleware(), s1, s2, function(req, res, next) {
    
});

function s1 (req,res,next){
    var userid = req.params.id;
    var sql = `select * from patient_medical_details where reg_id = '${userid}'`
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
    res.render('edit_med',{
        medical : req.q1,
        isAuthenticated: req.isAuthenticated(),
    })
}

router.post('/put/:id', authenticationMiddleware() ,function(req, res, next) {
    var reg_id = req.params.id;
    var gender = req.body.gender;
    var weight = req.body.weight;
    var height = req.body.height;
    var allergies = req.body.allergies
    console.log(allergies);

    var sql = ` update patient_medical_details set gender = '${gender}', weight = ${weight}, height = '${height}', allergies = '${allergies}' where reg_id = ${reg_id}`;

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