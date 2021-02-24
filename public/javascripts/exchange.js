var x;
function day_finder() {
    x = document.getElementById("date_a").value
    var ad =new Date(x);
    //console.log(ad);
    var weekdays = new Array(7);
    weekdays[0] = "sun";
    weekdays[1] = "weekday";
    weekdays[2] = "weekday";
    weekdays[3] = "weekday";
    weekdays[4] = "weekday";
    weekdays[5] = "weekday";
    weekdays[6] = "sat";
    r = weekdays[ad.getDay()];
    console.log(r);
}

$(".checkbut").click(function(){
    var $name = $(".doc_name").val();
    console.log($name);
    console.log(x);
    var $r = r;
    //console.log($r);
    var datacheck = {
        name_id : $name,
        day : $r,
    }
    //console.log(datacheck.name_id);
    //console.log(datacheck.day);
    $.ajax({
        type: 'POST',
        url: '/dashboard/check/',
        data: datacheck,
        success: function(result){
            console.log("data sent to dash");
            //console.log(result);
            $(".test").load("/dashboard/slots/"+x+'/'+$name);
        },
        error: function(err){
            console.log(err);
        }
    });
});