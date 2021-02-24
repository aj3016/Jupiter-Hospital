function age() {
    var DOB =(document.getElementById("bd").value).split("-");
    var DOB_in_sec = new Date(DOB).getTime();
    var current_time = Date.now();
    var age = Math.floor((current_time - DOB_in_sec)/31536000000);

    document.getElementById("ag").value=age;
}