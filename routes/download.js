var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:pat_id/:doc_id/:date', function(req, res, next) {
    var pat_id = req.params.pat_id;
    var doc_id = req.params.doc_id;
    var date = req.params.date;
    console.log(pat_id);
    console.log(doc_id);
    console.log(date);
    res.download('../jupiter_hospital/public/pdf/'+pat_id+'-'+doc_id+'-'+date+'.pdf');
});

module.exports = router;