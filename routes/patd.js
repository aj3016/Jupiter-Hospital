var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/:id/:i',q0, q1, q2, q3, q4, rest, function(req, res, next) {
    
});

function q0(req,res,next){
    var user_id = req.user.reg_id;
    var pat_id = req.params.id;
    pat_id = Number(pat_id);

    var s0 = `select * from pat_age where reg_id = '${pat_id}'`;
  	console.log(s0);

	  conn.query(s0,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.q0=result;
			return next();
		}
	});
}

function q1(req,res,next){
    var user_id = req.user.reg_id;
    var pat_id = req.params.id;
    pat_id = Number(pat_id);

	var s1 = `select * from patient_personal_details where reg_id = '${pat_id}'`;
  	console.log(s1);

	  conn.query(s1,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.q1=result;
			return next();
		}
	});
}

function q2(req,res,next){
    var user_id = req.user.reg_id;
    var pat_id = req.params.id;   
    pat_id = Number(pat_id);

	var s2 = `select * from patient_medical_details where reg_id = '${pat_id}'`;  
  	console.log(s2);

	  conn.query(s2,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.q2=result;
			return next();
		}
	});
}

function q3(req,res,next){
    var user_id = req.user.reg_id;
	var pat_id = req.params.id;
	var x = [{
		i : req.params.i,
	}]
	req.x=x;
	console.log(x.i);
    pat_id = Number(pat_id);

	var s3 = `select * from patient_medical_history where reg_id = '${pat_id}' and issue_by = '${user_id}'`
  	console.log(s3);

	  conn.query(s3,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.q3=result;
			return next();
		}
	});
}

function q4(req,res,next){
	var user_id = req.user.reg_id;
    var pat_id = req.params.id;
	var q = `select distinct issue_date from patient_medical_history where reg_id = ${pat_id} and issue_by = ${user_id}`;
	conn.query(q,function (err, result, fields) {
		if (err)
		console.log("[mysql error]",err);
		else{
			console.log(result);
			req.q4=result;
			return next();
		}
	});
}

function rest(req,res,next){
    res.render('dpt',{
        q0 : req.q0,
        q1 : req.q1,
        q2 : req.q2,
		q3 : req.q3,
		q4 : req.q4,
		newtip : req.x,
    });
}

router.post('/sel/:id', function(req, res, next) {
	var user = req.user.reg_id;
	var pat = req.params.id;
	pat = Number(pat);
	console.log(user);
	console.log(pat);
	var x = req.body;
	console.log(x);
	var num=Object.keys(x).length/2;
	
	for(i=1;i<=num;i++)
	{
		eval('var '+ 'medicine ' + '= ' + 'req.body.med_name' + i +';')
		eval('var '+ 'doss ' + '= ' + 'req.body.dosage' + i +';')
		console.log(medicine);
		console.log(doss);
		
		var sql1 = `insert into patient_medical_history(reg_id,issue_by,issue_date,medicine,dossage) values ('${pat}','${user}',curdate(),'${medicine}','${doss}')`;

		conn.query(sql1,function (err, data) { 
		if (err) 
			console.log("[mysql error]",err);
		console.log("User data is inserted successfully "); 
		});
	} 
	res.redirect('/dashboard')
});


router.post('/fees/:id',function(req, res, next){
	var reg_id = req.params.id;
	var u_id = req.user.reg_id;
	var fees = req.body.fees;
	var id;

	id = Number(reg_id);
	console.log(id);

	var c = `insert into fees(pat_reg_id,doc_reg_id,paid_on,fees) values ('${reg_id}','${u_id}',curdate(),'${fees}')`;

    conn.query(c,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully ");
	});
	res.redirect('/dashboard')
});

module.exports = router;
