var count = 0;
$('.add_form').click(function(){
    if(count===0){
        $(".details").append(`<div  class="card crd52 mx-auto my-2 shadow-sm text-light" style="width: 88%;height:60px; border-radius: 10px;  background: linear-gradient(to right,#000046, #1cb5e0 );">
        <div class="card-body crd53 mx-1">
            <div class="card-text crd54" >
                <div class="row crd55">
                    <div class="col-2 fo" style="text-align: center;">
                        <span class="text-light">Sr No.</span>
                    </div>
                    <div class="col-4 ml-3 fo" style="text-align: center;">
                        <span class="text-light">Medicine Name</span>
                    </div>
                    <div class="col-3 ml-3 fo" style="text-align: center;">
                        <span class="text-light">Dosage</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`)
        $(".save_pres").append(`<div class="row crd10">
        <div class="col-12 mt-4">
            <div class="sub">
                <button style="border-radius: 3px;margin-left: 6%; width: 88%" class="btn btn-block btn-success fo mb-4">     
                    Submit
                </button>
            </div>  
        </div>
    </div>`);
    }
    count++;
    $('.pres_form').append(`<div  class="card crd56 mx-auto my-2 shadow-sm row${count}" style="width: 88%; height:70px;text-align: center;border-radius: 10px; background-color: aliceblue ">
    <div class="card-body crd57 mx-1">
        <div class="card-text crd58" >
            <div class="row crd59">
                <div class="col-2">
                    <input type="textbox" style="width:50px;height:35px;" id="srno" name="srno${count}" class="srno${count}" value=${count} disabled>
                </div>
                <div class="col-4">
                    <input type="textbox" style="width:320px;height:35px;" id="med_name" name="med_name${count}" class="med_name${count}">
                </div>
                <div class="col-4">
                    <input type="textbox" placeholder="Morning-Afternoon-Night" style="width:190px;height:35px;" id="dosage" name="dosage${count}" class="dosage${count}">
                </div>
                <div class="col-2 bt">
                    <div class="d" >
                        <button class="btn btn-danger btn-sm del" id="${count}" name="delete${count}">     
                            <span class="bt" type="submit" style="padding-left:5px;padding-right:5px;text-decoration: none; color: white;">Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>  `);

});

$('.pres_form').on('click','.del',function(){
    var $i = $(this).attr('id');
    if(count===1){
        $(".details").empty();
        $(".save_pres").empty();
    }
    $(".row"+$i).remove();
    for(var j=(Number($i)+1);j<=count;j++){
       $(".srno"+j).attr('name',`srno${j-1}`);
       $('.srno'+j).attr('value',`${j-1}`);
       $(".srno"+j).removeClass("srno"+j).addClass("srno"+(j-1));
       $(".med_name"+j).attr('name',`med_name${j-1}`);
       $(".med_name"+j).removeClass("med_name"+j).addClass("med_name"+(j-1));
       $(".dosage"+j).attr('name',`dosage${j-1}`);
       $(".dosage"+j).removeClass("dosage"+j).addClass("dosage"+(j-1));
       $("div.row"+j).removeClass("row"+j).addClass("row"+(j-1));
       $('#'+j).attr('id',`${j-1}`);
    }   
    count--;
});     