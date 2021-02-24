var express = require('express');
var router = express.Router();
const fs = require("fs");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
var moment = require('moment'); 

//const bodyParser =require('body-parser');
//const urlencodedParser = bodyParser.urlencoded({ extended: false });

moment().format(); 

/* GET home page. */
router.get('/', authenticationMiddleware(),ppd,age,pmd,pmh,pba1,pba2,status,today_pat,dis_med_his,rp,function(req, res, next) {
  
});

function ppd(req,res,next){
	var user = req.app.get('u');
  	var id = req.user.reg_id;

	if(user==='patient_login'){
		t = 'patient_personal_details';
		var sql = `select * from ${t} where reg_id = ${id}`
		console.log(sql);

		conn.query(sql,function (err, result, fields) {
			if (err)
			console.log("[mysql error]",err);
			else{
				console.log(result);
				req.pd=result;
				return next();
			}
		});
	}else if(user==='doctor_login'){
		t = 'doctor_personal_details';
		var sql = `select * from ${t} where reg_id = ${id}`
		console.log(sql);

		conn.query(sql,function (err, result, fields) {
			if (err)
			console.log("[mysql error]",err);
			else{
				console.log(result);
				req.pd=result;
				return next();
			}
		});
	}else if('receptionists_login'){
		t = 'appointments'
		var sql = `select * from ${t} where app_date = curdate() order by doc_reg_id`
		console.log(sql);

		conn.query(sql,function (err, result, fields) {
			if (err)
			console.log("[mysql error]",err);
			else{
				console.log(result);
				req.pd=result;
				return next();
			}
		});
	}
}

function age(req,res,next){
	var user = req.app.get('u');
  	var id = req.user.reg_id;

	if(user==='patient_login'){
		t = 'pat_age';
	}else if(user==='doctor_login'){
		t = 'doc_age';
	}else if('receptionists_login'){
		return next();
	}

	var sql = `select * from ${t} where reg_id = ${id}`
	console.log(sql);

	conn.query(sql,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.ag=result;
			return next();
		}
	});
}

function pmd(req,res,next){
	var user = req.app.get('u');
  	var id = req.user.reg_id;

	if(user==='patient_login'){
		t = 'patient_medical_details';
		var sql = `select * from ${t} where reg_id = ${id}`
  		console.log(sql);
	}else if(user==='doctor_login'){
		t = 'doctor_work_details';
		var sql = `select * from ${t} where reg_id = ${id}`
  		console.log(sql);
	}else if('receptionists_login'){
		var sql = `select * from patient_personal_details`
  		console.log(sql);
	}

	conn.query(sql,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.md=result;
			return next();
		}
	});
}

function pmh(req,res,next){
	var user = req.app.get('u');
  	var id = req.user.reg_id;

	if(user==='patient_login'){
		t = 'patient_medical_history';
		var sql = `select * from ${t} where reg_id = ${id}`
  		console.log(sql);
	}else if(user==='doctor_login'){
		t = 'appointments';
		var sql = `select * from ${t} where doc_reg_id = ${id} and stat is null order by app_date, app_time`
  		console.log(sql);
	}else if('receptionists_login'){
		var sql= `select distinct doc_reg_id from appointments order by doc_reg_id;`
	}

	

	conn.query(sql,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.mh=result;
			return next();
		}
	});
}

function pba1(req,res,next){
	var user = req.app.get('u');
  	var id = req.user.reg_id;

	if(user==='patient_login'){
		t = 'doctor_personal_details';
		var sql = `select * from ${t} order by reg_id;`;
  		console.log(sql);
	}else if(user==='doctor_login'){
		t = 'patient_personal_details';
		var sql = `select * from ${t} order by reg_id;`;
  		console.log(sql);
	}else if('receptionists_login'){
		var sql = `select * from doctor_personal_details order by reg_id;`;
  		console.log(sql);
	}
	conn.query(sql,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.ba1=result;
			return next();
		}
	});
}

function pba2(req,res,next){
	var user = req.app.get('u');
  	var id = req.user.reg_id;

	if(user==='patient_login'){
		t = 'doctor_work_details';
		var sql = `select * from ${t} order by reg_id;`;
  		console.log(sql);
	}else if(user==='doctor_login'){
		t = 'patient_medical_history';
		var sql = `select * from ${t} order by reg_id;`;
  		console.log(sql);
	}else if('receptionists_login'){
		var sql = `select * from doctor_work_details order by reg_id;`;
  		console.log(sql);
	}

	conn.query(sql,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.ba2=result;
			return next();
		}
	});
}

function status(req,res,next){
	var user = req.app.get('u');
	var id = req.user.reg_id;

	if((user==='patient_login')||(user==='doctor_login')){
		var sql = `select * from appointments where pat_reg_id = ${id} order by app_date, app_time`;
		console.log(sql);

		conn.query(sql,function (err, result, fields) {
			if (err)
			console.log("[mysql error]",err);
			else{
				console.log(result);
				req.sta=result;
				return next();
			}
		});
	}
	else{
		return next();
	}
}

function today_pat(req,res,next){
	var user = req.app.get('u');
	var id = req.user.reg_id;

	if(user==='doctor_login'){
		var sql = `select * from appointments where doc_reg_id = ${id} and app_date = curdate() and stat = true and checked is null order by app_time`;
		console.log(sql);

		conn.query(sql,function (err, result, fields) {
			if (err)
			console.log("[mysql error]",err);
			else{
				console.log(result);
				req.top=result;
				return next();
			}
		});
	}
	else{
		return next();
	}
}

function dis_med_his(req,res,next){
	var id = req.user.reg_id;
	var q = `select distinct issue_date, issue_by from patient_medical_history where reg_id = ${id}`;
	conn.query(q,function (err, result, fields) {
		if (err)
		console.log("[mysql error]",err);
		else{
			console.log(result);
			req.dis=result;
			return next();
		}
	});
}

function rp(req,res,next){
	var user = req.app.get('u');
	res.render('dashboard',{
		isAuthenticated: req.isAuthenticated(),
		user: user,
		pd:req.pd,
		ag:req.ag, 
		md:req.md,
		mh:req.mh,
		ba1:req.ba1,
		ba2:req.ba2,
		sta:req.sta,
		top:req.top,
		dis:req.dis,
	});

}

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

router.post('/check',pba2,function(req, res, next) {
	
	var name_id = Number(req.body.name_id);
	console.log(name_id);
	var day = req.body.day;
	console.log(day);
	for(var i=0; i < req.ba2.length; i++){
		if(req.ba2[i].reg_id===name_id){
			var day_from = day + "_from";
			var day_to = day + "_to";

			if(day_from === "weekday_from"){
				time_ll = req.ba2[i].weekday_from;
			}
			else if(day_from === "sat_from"){
				time_ll = req.ba2[i].sat_from;
			}
			else{
				time_ll = req.ba2[i].sun_from;
			}

			if(day_to === "weekday_to"){
				time_ul = req.ba2[i].weekday_to;
			}
			else if(day_to === "sat_to"){
				time_ul = req.ba2[i].sat_to;
			}
			else{
				time_ul = req.ba2[i].sun_to;
			}
		}
	}
	console.log(time_ll + "This is ll");
	console.log(time_ul + "This is ul");

	
	function timeConvertor(time) {
		if(time==="Unavailable"){
			var time = {
				hour : 0,
				min : 0,
			}
			return time;
		}
		else{
			var PM = time.match('PM') ? true : false
		
			time = time.split(':')
			
			if (PM) {
				if(time[0]==='12'){
					var hour = 12;
					var min = time[1].replace('PM', '');
				}
				else{
					var hour = 12 + parseInt(time[0],10);
					var min = time[1].replace('PM', '');
				}
			} else {
				var hour = time[0]
				var min = time[1].replace('AM', '')
			}
			
			var time = {
				hour : hour,
				min : min,
			}
			return time
		}
	}

	time_l=timeConvertor(time_ll);
	console.log(time_l.hour);
	console.log(time_l.min);
	time_u=timeConvertor(time_ul);
	console.log(time_u.hour);
	console.log(time_u.min);

	var startTime = moment().utc().set({hour:Number(time_l.hour),minute:Number(time_l.min)});
	var endTime = moment().utc().set({hour:Number(time_u.hour),minute:Number(time_u.min)});

	timeStops = [];

	while(startTime <= endTime){
		timeStops.push(new moment(startTime).format('HH:mm'));
		startTime.add(15, 'minutes');
	}

	console.log('timeStops ', timeStops)

	var trunc = `truncate temp`
	conn.query(trunc,function (err, data) { 
		if (err) 
		  console.log("[mysql error]",err);
		console.log("temp truncated succesfully successfully "); 
	});

	for(i=0;i<timeStops.length;i++){
		
		var slot_jot = `insert into temp (slots) values ('${timeStops[i]}')`

		conn.query(slot_jot,function (err, data) { 
			if (err) 
			  console.log("[mysql error]",err);
			console.log("User data is inserted successfully "); 
		});
	}	
	res.send(name_id+':'+day);
});


router.post('/tt',npd,ndd,function(req, res, next) {
    var pat_reg_id = req.user.reg_id;
    var doc_reg_id = req.body.doc_name;
    var app_date = req.body.date_a;
    var app_time = req.body.app_time;
	var symptoms = req.body.allergies;
	
    var q = `insert into appointments(pat_reg_id,doc_reg_id,app_date,app_time,symptoms) values ('${pat_reg_id}','${doc_reg_id}','${app_date}','${app_time}','${symptoms}')`;

    conn.query(q,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully ");
	});
	
	var pat = req.newpd;
	var doc = req.newdd;
	console.log(pat);
	console.log(doc);

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'appointments.jupiterhospital@gmail.com', // generated ethereal user
		  pass: 'jh@app1234', // generated ethereal password
		},
	});
	
var msg =`Dear ${pat[0].fname} ${pat[0].lname},
	Your request for the Appointment of Doctor ${doc[0].fname} on ${app_date} at ${app_time} has been duely Noted. We will notify you when the doctor accepts or declines your appointment. Please regularly check your email and stay tuned.
Thanks & Regards
Jupiter Hospitsal`

	var mailOptions = {
		from: '"Appointmet" <appointments.jupiterhospital@gmail.com>', // sender address
		to: `${pat[0].email}`, // list of receivers
		subject: "Appointment Booked", // Subject line
		text: msg, // plain text body
	}

	  // send mail with defined transport object
	transporter.sendMail(mailOptions,function(error,info){
		if(error){
			console.log(error);
		}
		else{
			console.log('email sent'+ info.response);
		}
	});

	res.redirect("/dashboard"); 
});


function npd(req,res,next){
	var pat_reg_id = req.user.reg_id;
	

	var fet = `select * from patient_personal_details where reg_id = ${pat_reg_id}`

	conn.query(fet,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.newpd = result;
			return next()
		}
	});

}

function ndd(req,res,next){
	var doc_reg_id = req.body.doc_name;
	var fet = `select * from doctor_personal_details where reg_id = ${doc_reg_id}`

	conn.query(fet,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.newdd = result;
			return next()
		}
	});

}


router.post('/true', patdadt, docdat, function(req, res, next){
	var reg_id = req.body.reg_id;
	var name = req.body.name;
	var date = req.body.date;
	var u_id = req.user.reg_id;
	var time = req.body.time;
	var id;
	console.log(name);
	console.log(date);
	
	id = Number(reg_id);
	console.log(id);

	var c = `update appointments set stat = true where pat_reg_id = ${id} and doc_reg_id = ${u_id} and app_date = '${date}'`;

    conn.query(c,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully ");
	});

	var pat = req.nvpd;
	var doc = req.nvdd;
	console.log(pat);
	console.log(doc);

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'appointments.jupiterhospital@gmail.com', // generated ethereal user
		  pass: 'jh@app1234', // generated ethereal password
		},
	});
	
var msg =`Dear ${pat[0].fname} ${pat[0].lname},
	Your Appointment of Doctor ${doc[0].fname} on ${date} at ${time} has been accepted by the doctor. Please be present 10 mins before your appointment Time. Please do not reply to this mail as it is system generated.
Thanks & Regards
Jupiter Hospitsal`

	var mailOptions = {
		from: '"Appointmet" <appointments.jupiterhospital@gmail.com>', // sender address
		to: `${pat[0].email}`, // list of receivers
		subject: "Appointment Accepted", // Subject line
		text: msg, // plain text body
	}

	  // send mail with defined transport object
	transporter.sendMail(mailOptions,function(error,info){
		if(error){
			console.log(error);
		}
		else{
			console.log('email sent'+ info.response);
		}
	});


	res.send("empty")
});


function patdadt(req,res,next){
	var reg_id = req.body.reg_id;

	id = Number(reg_id);
	console.log(id);

	var fet = `select * from patient_personal_details where reg_id = ${id}`

	conn.query(fet,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.nvpd = result;
			return next()
		}
	});
}

function docdat(req,res,next){
	var u_id = req.user.reg_id;

	var fet = `select * from doctor_personal_details where reg_id = ${u_id}`

	conn.query(fet,function (err, result, fields) {
		if (err)
		  console.log("[mysql error]",err);
		else{
			console.log(result);
			req.nvdd = result;
			return next();
		}
	});
}


router.post('/false', patdadt, docdat,function(req, res, next){
	var reg_id = req.body.reg_id;
	var name = req.body.name;
	var date = req.body.date;
	var u_id = req.user.reg_id;
	var time = req.body.time;
	var id;
	console.log(name);
	console.log(date);
	
	id = Number(reg_id);
	console.log(id);

	var c = `update appointments set stat = false where pat_reg_id = ${id} and doc_reg_id = ${u_id} and app_date = '${date}'`;

    conn.query(c,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully ");
	});

	var pat = req.nvpd;
	var doc = req.nvdd;
	console.log(pat);
	console.log(doc);

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'appointments.jupiterhospital@gmail.com', // generated ethereal user
		  pass: 'jh@app1234', // generated ethereal password
		},
	});
	
var msg =`Dear ${pat[0].fname} ${pat[0].lname},
	Your Appointment of Doctor ${doc[0].fname} on ${date} at ${time} has been Denied by the doctor. Please try to book Appointment for some other date and time. Please do not reply to this mail as it is system generated.
Thanks & Regards
Jupiter Hospitsal`

	var mailOptions = {
		from: '"Appointmet" <appointments.jupiterhospital@gmail.com>', // sender address
		to: `${pat[0].email}`, // list of receivers
		subject: "Appointment Denied", // Subject line
		text: msg, // plain text body
	}

	  // send mail with defined transport object
	transporter.sendMail(mailOptions,function(error,info){
		if(error){
			console.log(error);
		}
		else{
			console.log('email sent'+ info.response);
		}
	});

	res.send("empty")
});


router.post('/checked',function(req, res, next){
	var reg_id = req.body.reg_id;
	var u_id = req.user.reg_id;
	var date = req.body.date;
	var id;

	id = Number(reg_id);
	console.log(id);

	var c = `update appointments set checked = true where pat_reg_id = ${id} and doc_reg_id = ${u_id} and app_date = '${date}'`;

    conn.query(c,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully ");
	});
	res.send("empty")
});


router.post('/del',function(req, res, next){
	var reg_id = req.body.reg_id;
	var u_id = req.user.reg_id;
	var date = req.body.date;
	var id;

	id = Number(reg_id);
	console.log(id);

	var c = `update appointments set checked = false where pat_reg_id = ${id} and doc_reg_id = ${u_id} and app_date = '${date}'`;

    conn.query(c,function (err, data) { 
      if (err) 
        console.log("[mysql error]",err);
      console.log("User data is inserted successfully ");
	});
	res.send("empty")
});


router.post('/reciept',pres1,pres2,patient,doctor,doctor_work,patient_age,patient_med,function(req, res, next){
	var pat_reg_id = req.body.pat_reg_id;
	var doc_reg_id = req.body.doc_reg_id;
	var date = req.body.date;
	

	var obj = {
		fees : req.res1,
		med : req.res2,
		pat : req.dd1,
		doc : req.dd2,
		dw : req.dd3,
		pa : req.dd4,
		pm : req.dd5,
		date : date,
	} 

	var loc = '../jupiter_hospital/public/pdf/'+pat_reg_id+'-'+doc_reg_id+'-'+date+'.pdf'; 

	createInvoice(obj,loc);
	
	var sql3 = `update fees set stat = true where pat_reg_id = ${pat_reg_id} and doc_reg_id = ${doc_reg_id} and paid_on = '${date}'`;

	conn.query(sql3,function (err, data) { 
		if (err) 
		  console.log("[mysql error]",err);
		console.log("User data is inserted successfully ");
	});
	
	res.send('empty');
});


function pres1(req,res,next){
	var pat_reg_id = req.body.pat_reg_id;
	var doc_reg_id = req.body.doc_reg_id;
	var date = req.body.date;

	var sq1 = `select * from fees where pat_reg_id = ${pat_reg_id} and doc_reg_id = ${doc_reg_id} and paid_on = '${date}'`;
	console.log(sq1);

	conn.query(sq1,function (err, result, fields) {
		if (err)
		console.log("[mysql error]",err);
		else{
			console.log(result);
			req.res1=result;
			next();
		}
	});
}

function pres2(req,res,next){
	var pat_reg_id = req.body.pat_reg_id;
	var doc_reg_id = req.body.doc_reg_id;
	var date = req.body.date;

	var sq2 = `select * from patient_medical_history where reg_id = ${pat_reg_id} and issue_by = ${doc_reg_id} and issue_date = '${date}'`;
	console.log(sq2);
	
	conn.query(sq2,function (err, result, fields) {
		if (err)
		console.log("[mysql error]",err);
		else{
			console.log(result);
			req.res2=result;
			next();
		}
	});
}

function patient(req,res,next){
	var pat_reg_id = req.body.pat_reg_id;
	
	var sql = `select * from patient_personal_details where reg_id = ${pat_reg_id}`
	console.log(sql);

	conn.query(sql,function (err, result, fields) {
		if (err)
		console.log("[mysql error]",err);
		else{
			console.log(result);
			req.dd1=result;
			return next();
		}
	});
}

function patient_age(req,res,next){
	var pat_reg_id = req.body.pat_reg_id;
	
	var sql = `select * from pat_age where reg_id = ${pat_reg_id}`
	console.log(sql);

	conn.query(sql,function (err, result, fields) {
		if (err)
		console.log("[mysql error]",err);
		else{
			console.log(result);
			req.dd4=result;
			return next();
		}
	});
}

function patient_med(req,res,next){
	var pat_reg_id = req.body.pat_reg_id;
	
	var sql = `select * from patient_medical_details where reg_id = ${pat_reg_id}`
	console.log(sql);

	conn.query(sql,function (err, result, fields) {
		if (err)
		console.log("[mysql error]",err);
		else{
			console.log(result);
			req.dd5=result;
			return next();
		}
	});
}

function doctor(req,res,next){
	var doc_reg_id = req.body.doc_reg_id;
	
	var sql = `select * from doctor_personal_details where reg_id = ${doc_reg_id}`
	console.log(sql);

	conn.query(sql,function (err, result, fields) {
		if (err)
		console.log("[mysql error]",err);
		else{
			console.log(result);
			req.dd2=result;
			return next();
		}
	});
}

function doctor_work(req,res,next){
	var doc_reg_id = req.body.doc_reg_id;
	
	var sql = `select * from doctor_work_details where reg_id = ${doc_reg_id}`
	console.log(sql);

	conn.query(sql,function (err, result, fields) {
		if (err)
		console.log("[mysql error]",err);
		else{
			console.log(result);
			req.dd3=result;
			return next();
		}
	});
}

function createInvoice(invoice, path) {
	let doc = new PDFDocument({ margin: 50 });

		generateHeader(doc,invoice);
		generateInvoiceTable(doc, invoice);
		generateFooter(doc);

	doc.end();
	doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc,invoice) {
	doc
	  .fontSize(35)
	  .fillColor('#89cff0')
	  .text("Jupiter Hospital", 190, 30)
	  .fillColor('black')
	  .fontSize(15)
	  .text(`Dr ${invoice.doc[0].fname} ${invoice.doc[0].lname}`, 50, 80, { align: "left", continued : true })
	  .fontSize(12)
	  .text(`  ${invoice.dw[0].degree} ${invoice.dw[0].specialization}`,doc.x, 84,{ align: "left" })
	  .fontSize(10)
	  .text('Station Rd, Agarkar Nagar,',50, 104,{ align: "left" })
	  .text('Pune, Maharashtra,',50, 114,{ align: "left" })
	  .text('Zip Code:41100,',50, 124,{ align: "left" })
	  .text('PH1: +912066819999',250, 104,{ align: "right" })
	  .text('PH2: +912066819966',250, 114,{ align: "right" })
	  .moveTo(50,144)
	  .lineTo(560,144)
	  .strokeColor('#89cff0')
	  .stroke() 
	  .text(`Patient Name: ${invoice.pat[0].fname} ${invoice.pat[0].lname}`,50,164,{ align: "left", continued : true })
	  .text(`Age: ${invoice.pa[0].age}`,150,164,{ align: "left", continued : true })
	  .text(`Gender: ${invoice.pm[0].gender}`,270,164,{ align: "left", continued : false })
	  .text(`Weight: ${invoice.pm[0].weight}`,50,184,{ align: "left", continued : true })
	  .text(`Height: ${invoice.pm[0].height}`,245,184,{ align: "left", continued : true })
	  .text(`Issue Date: ${invoice.date}`,355,184,{ align: "left", continued : false })
	  .fontSize(10)
	  .text('SrNo', 50, 250)
	  .text('Medicine Name', 245, 250)
	  .text('Dosage', 450, 250, { width: 90, align: "right" })
	  .lineCap('butt')
	  .moveTo(50,265)
	  .lineTo(560,265)
	  .strokeColor('black')
	  .stroke() 
	  .moveDown(); 
}

function generateTableRow(doc, y, c1, c2, c3) {
	doc
	  .fontSize(10)
	  .text(c1, 50, y)
	  .text(c2, 250, y)
	  .text(c3, 450, y, { width: 90, align: "right" })
	  .lineCap('butt')
	  .moveTo(50,(y+15))
	  .lineTo(560,(y+15))
	  .strokeColor('black')
	  .stroke() 
}

function generateInvoiceTable(doc,invoice) {
	var invoiceTableTop = 260;

	for (var i = 0; i < invoice.med.length; i++) {
		var position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(doc,position,(i+1),invoice.med[i].medicine,invoice.med[i].dossage)
	}

	doc
		.fontSize(10)
		.text(`Fees To be Paid: ${invoice.fees[0].fees}`,400,invoiceTableTop+((i + 2)*30))
		.text(`Hospital Stamp and Signature`,75,invoiceTableTop+((i + 5)*30))
		.text(`Doctor Signature`,450,invoiceTableTop+((i + 5)*30))
} 

function generateFooter(doc) {
	doc
		.moveTo(50,700)
		.lineTo(560,700)
		.strokeColor('#89cff0')
		.stroke()
		.fontSize(10) 
		.text('Next visit after 7 days',400,720)
} 


module.exports = router;


