$(".accept").click(function(){
    var $i = $(this).attr('id');
    var $pat_reg_id = $("span.ids"+$i).text();
    var $name = $("span.names"+$i).text();
    var $date = $("span.dates"+$i).text();
    var $time = $("span.times"+$i).text();
    console.log($i);
    console.log($pat_reg_id);
    console.log($name);
    console.log($date);

    var div = $date.split(" ");

    console.log(div);
    
    var m;
    if(div[1]==="Jan")
        m = "01";
    else if (div[1]==="Feb")
        m = "02";
    else if (div[1]==="Mar")
        m = "03";
    else if (div[2]==="Apr")
        m = "04";
    else if (div[1]==="May")
        m = "05";
    else if (div[1]==="Jun")
        m = "06";
    else if (div[1]==="Jul")
        m = "07";
    else if (div[1]==="Aug")
        m = "08";
    else if (div[1]==="Sep")
        m = "09";
    else if (div[1]==="Oct")
        m = "10";
    else if (div[1]==="Nov")
        m = "11";
    else if (div[1]==="Dec")
        m = "12";

    var $final_date = div[3]+"-"+m+"-"+div[2];   
    console.log($final_date);

    var aod={
        reg_id : $pat_reg_id,
        name : $name,
        date : $final_date,
        time : $time,
    }

    $.ajax({
        type: 'POST',
        url: '/dashboard/true',
        data: aod,
        success: function(result){
            console.log("data sent to dash");
            $(".row"+$i).remove();
            location.reload();
        },
        error: function(err){
            console.log(err);
        }
    });
});


$(".decline").click(function(){
    var $i = $(this).attr('id');
    var $pat_reg_id = $("span.ids"+$i).text();
    var $name = $("span.names"+$i).text();
    var $date = $("span.dates"+$i).text();
    var $time = $("span.times"+$i).text();
    console.log($i);
    console.log($pat_reg_id);
    console.log($name);
    console.log($date);

    var div = $date.split(" ");

    console.log(div);
    
    var m;
    if(div[1]==="Jan")
        m = "01";
    else if (div[1]==="Feb")
        m = "02";
    else if (div[1]==="Mar")
        m = "03";
    else if (div[2]==="Apr")
        m = "04";
    else if (div[1]==="May")
        m = "05";
    else if (div[1]==="Jun")
        m = "06";
    else if (div[1]==="Jul")
        m = "07";
    else if (div[1]==="Aug")
        m = "08";
    else if (div[1]==="Sep")
        m = "09";
    else if (div[1]==="Oct")
        m = "10";
    else if (div[1]==="Nov")
        m = "11";
    else if (div[1]==="Dec")
        m = "12";

    var $final_date = div[3]+"-"+m+"-"+div[2];   
    console.log($final_date);

    var aod={
        reg_id : $pat_reg_id,
        name : $name,
        date : $final_date,
        time : $time,
    }

    $.ajax({
        type: 'POST',
        url: '/dashboard/false',
        data: aod,
        success: function(result){
            console.log("data sent to dash");
            $(".row"+$i).remove();
            location.reload();
        },
        error: function(err){
            console.log(err);
        }
    });
});