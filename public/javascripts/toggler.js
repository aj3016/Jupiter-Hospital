$(".doc_name").click(function(){
    var $i = $(this).attr('id');
    $('.dat'+$i).slideToggle(800);
});

$(".reciept").click(function(){
    var $j = $(this).attr('id');
    var pat_reg_id = $(".patreg"+$j).text();
    var $date = $('.dte'+$j).text();
    console.log($j);

    var DOM = document.getElementsByClassName('gp');
    console.log(DOM);
    var index = $('.dte'+$j).parentsUntil(DOM, ".row").attr('id');
    console.log(index);
    var doc_reg_id = $(".docreg"+index).text();

    console.log(index);
    console.log(pat_reg_id);
    console.log(doc_reg_id);
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

    var obj={
        pat_reg_id : pat_reg_id,
        doc_reg_id : doc_reg_id,
        date : $final_date,
    }

    $.ajax({
        type: 'POST',
        url: '/dashboard/reciept',
        data: obj,
        success: function(result){
            console.log("data sent to dash");
            window.location.href='/download/'+'/'+pat_reg_id+'/'+doc_reg_id+'/'+$final_date;
            window.alert('Reciept Generated');
        },
        error: function(err){
            console.log(err);
        }
    });
    
});