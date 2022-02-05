$("#home").css("display","block");
$("#customer").css("display","none");
$("#item").css("display","none");
$("#placeOrder").css("display","none");


$("#linkCustomer").click(function (){
    $("#customer").css("display","block");
    $("#home").css("display","none");
    $("#item").css("display","none");
    $("#placeOrder").css("display","none");

});

$("#linkItem").click(function (){
    $("#item").css("display","block");
    $("#customer").css("display","none");
    $("#home").css("display","none");
    $("#placeOrder").css("display","none");

});

$("#linkOrder").click(function (){
    $("#placeOrder").css("display","block");
    $("#item").css("display","none");
    $("#customer").css("display","none");
    $("#home").css("display","none");

});


$("#linkHome").click(function (){
    $("#home").css("display","block");
    $("#item").css("display","none");
    $("#customer").css("display","none");
    $("#placeOrder").css("display","none");
});

