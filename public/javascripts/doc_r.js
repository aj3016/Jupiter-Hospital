var id = 0;
$(".view").click(function(){
    var $i = $(this).attr('id');
    var $pat_reg_id = $(".id"+$i).text();
    console.log($i);

    id = $pat_reg_id;

    console.log(id);

    $(".doc_show"+$i).load("/dashboard/patd/"+id+"/"+$i)
    $(".doc_show"+$i).slideToggle(800);  
});

$(".checked").click(function(){
    var $i = $(this).attr('id');
    var $pat_reg_id = $(".id"+$i).text();
    var $date = $(".date"+$i).text();

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

    var obj = {
        reg_id : $pat_reg_id,
        date : $final_date,
    }

    document.getElementById("feeclass").action = "/dashboard/patd/fees/"+$pat_reg_id;

    $.ajax({
        type: 'POST',
        url: '/dashboard/checked',
        data: obj,
        success: function(result){
            console.log("data sent to dash");
            $(".row"+$i).remove();
        },
        error: function(err){
            console.log(err);
        }
    });
});

$(".delete").click(function(){
    var $i = $(this).attr('id');
    var $pat_reg_id = $(".id"+$i).text();

    var $date = $(".date"+$i).text();

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

    var obj = {
        reg_id : $pat_reg_id,
        date : $final_date,
    }

    $.ajax({
        type: 'POST',
        url: '/dashboard/del',
        data: obj,
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