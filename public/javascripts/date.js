var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var set = tomorrow.toISOString().split('T')[0];
document.getElementsByName("date_a")[0].setAttribute('min', set);

/*function day_finder(ba2) {
    var ad =new Date(document.getElementById("date_a").value);
    console.log(ad);
    console.log(ba2);
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
    return r;
}

function doc_name_finder(){
    var name = document.getElementById("doc_name").value;
    console.log(name);
}*/