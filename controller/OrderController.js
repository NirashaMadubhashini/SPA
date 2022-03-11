$("#btnAddToCart").click(function () {
    saveOrder();
    clearAllOrder();
    loadAllOrders();
});

function loadAllOrders() {

    $("#tblOrder").empty();
    for (var i of orderDB) {
        let row = `<tr><td>${i.orderId}</td><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.qty}</td><td>${i.unitPrice}</td><td>${i.total}</td></tr>`;
        $("#tblOrder").append(row);
    }
}

function saveOrder() {
    let orderDTO = new OrderDTO(
        $("#txtOrderId").val(),
        $("#selectCusID").val(),
        $("#selectItemCode").val(),
        $("#txt-qty").val(),
        $("#total").val());


    var orderObject = {
        orderId: orderDTO.oid,
        customerId: orderDTO.cid,
        itemCode: orderDTO.icode,
        qtOH: orderDTO.qtyOnHnd,
        tot:orderDTO.cost
    }

    orderDB.push(orderObject)
}

$("#btnRemove").click(function () {
    var index = 0;
    for (var i = 0; i < orderDB.length; i++) {
        if ($("#txtOrderId").val() === orderDB[i].orderId) {
            index = i;
        }
    }
    orderDB.splice(index, 1);
    clearAllOrder();
    $(this).closest('tr').remove();

    confirm("Do you want to delete this Order..?")
});









const orderIDRegEx=/^(O00-)[0-9]{3}$/;
const qtOHRegEx = /^[0-9 A-z]{2,}$/;
const cashRegEx = /^[0-9]{2,}$/;


$('#txtOrderId,#txt-qty,#txtCash').on('keydown', function (eventOb) {
    if (eventOb.key === "Tab") {
        eventOb.preventDefault();
    }
    formValidOrder();
});

$('txtOrderId,#txt-qty,#txtCash').on('blur', function () {
    formValidOrder();
});

$("#txtOrderId").on('keyup', function (eventOb) {
    setButtonOrder();

    if (eventOb.key === "Enter") {
        checkIfValidOrder();
    }

    if (eventOb.key === "Control") {
        var typedOrderId = $("#txtOrderId").val();
        var srcOrder = searchOrderFromID(typedOrderId);
        $("#txtOrderId").val(srcOrder.getOrderId());
        $("#txt-qty").val(srcOrder.getQty());
        $("#txtCash").val(srcOrder.getCash());
    }
});



$("#txt-qty").on('keyup', function (eventOb) {
    setButtonOrder();
    if (eventOb.key === "Enter") {
        checkIfValidOrder();
    }
});

$("#txtCash").on('keyup', function (eventOb) {
    setButtonOrder();
    if (eventOb.key === "Enter") {
        checkIfValidOrder();
    }
});

$("#btnPay").attr('disabled', true);

function clearAllOrder(){
    $('#txtOrderId,#txt-qty,#txtCash').val("");
    $('#txtOrderId,#txt-qty,#txtCash').css('border', '2px solid #ced4da');
    $('#txtOrderId').focus();
    $("#btnPay").attr('disabled', true);
    loadAllOrders();
    $("#lblorderId,#lblorderQty,#lblcash").text("");
}

function formValidOrder() {
    var orderID = $("#txtOrderId").val();
    $("#txtOrderId").css('border', '2px solid green');
    $("#lblorderId").text("");
    if (orderIDRegEx.test(orderID)) {
        var qty = $("#txt-qty").val();
        if (qtOHRegEx.test(qty)) {
            $("#txt-qty").css('border', '2px solid green');
            $("#lblcusname").text("");
                var cash = $("#txtCash").val();
                var resp = cashRegEx.test(cash);
                $("#txt-qty").css('border', '2px solid green');
                $("#lblorderQty").text("");
                if (resp) {
                    $("#txtCash").css('border', '2px solid green');
                    $("#lblcash").text("");
                    return true;
                } else {
                    $("#txtCash").css('border', '2px solid red');
                    $("#lblcash").text("Insufficient cash balance");
                    return false;
                }
        } else {
            $("#txt-qty").css('border', '2px solid red');
            $("#lblorderQty").text("insufficient Quantity");
            return false;
        }
    } else {
        $("#txtOrderId").css('border', '2px solid red');
        $("#lblorderId").text("Order ID is a required field : Pattern O00-000");
        return false;
    }
}


function checkIfValidOrder(){
    var orderID = $("#txtOrderId").val();
    if (orderIDRegEx.test(orderID)) {
        $("#txt-qty").focus();
        var qty = $("#txt-qty").val();
        if (qtOHRegEx.test(qty)) {
                $("#txtCash").focus();
                var cash = $("#txtCash").val();
                var resp = cashRegEx.test(cash);
                if (resp) {
                    let res = confirm("Do you really want to Purchase this order..?");
                    if (res) {
                        saveOrder();
                        clearAllOrder();
                    }
                } else {
                    $("#txtCash").focus();
                }
        } else {
            $("#txt-qty").focus();
        }
    } else {
        $("#txtOrderId").focus();
    }
}

function setButtonOrder(){
    let b = formValidOrder();
    if (b) {
        $("#btnPay").attr('disabled', false);
    } else {
        $("#btnPay").attr('disabled', true);
    }
}

$('#btnPay').click(function () {
    checkIfValidOrder();
});