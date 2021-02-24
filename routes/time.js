var express = require('express');
var router = express.Router();
//var doc_name = require("./dashboard");

/* GET home page. */
router.get('/:id1/:id2', ss, val, ppt, function(req, res, next) {
  
});


function ss(req,res,next){
  conn.query("select * from temp",function (err, result, fields) {
    if (err)
      console.log("[mysql error]",err);
    else{

      function formatTimeShow(h_24,m) {
        var h = h_24 % 12;
        if (h === 0) h = 12;
        return (h < 10 ? '0' : '') + h + ':' + m + (h_24 < 12 ? 'AM' : 'PM');
      }

      var converter = [];
      var final = [];

      for(i=0;i<result.length;i++){  
        var div =  result[i].slots.split(':');
        console.log(div);
        var values ={
          hr : div[0],
          min : div[1], 
        };

        converter.push(values);

        var x = formatTimeShow(converter[i].hr,converter[i].min); 
        final .push(x);

      }      

      req.n1 = final;
      return next();
    }
  });
}

function val(req,res,next){
  var app_date = req.params.id1;
  var doc_id = req.params.id2;
  //var user = req.user.reg_id;
  console.log(doc_id);
  console.log(app_date); 

  conn.query(`select app_time from appointments where doc_reg_id = ${doc_id} and app_date = '${app_date} order by app_time'`,function (err, result, fields) {
    if (err)
      console.log("[mysql error]",err);
    else{
      console.log(result);
			req.n2=result;
			return next();
    }
  });

}

function ppt(req,res,next){
  res.render('time',{
    test : req.n1,
    valdem : req.n2,
  });
}


module.exports = router;