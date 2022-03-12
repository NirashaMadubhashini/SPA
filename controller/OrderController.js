$("#btnPay").click(function () {
    // saveOrder();
    clearAllOrder();
    // loadAllOrders();
});
$("#btnAddToCart").click(function () {
    saveOrder();
    // clearAllOrder();
    loadAllOrders();
});

// function getRandomNumbers() {
//     var array = new Uint32Array(10);
//     window.crypto.getRandomValues(array);
//
//     for (var i = 0; i < array.length; i++) {
//         console.log(array[i] + " ");
//     }
// }


// (function() {
//     function IDGenerator() {
//
//         this.length = 8;
//         this.timestamp = +new Date;
//
//         var _getRandomInt = function( min, max ) {
//             return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
//         }
//
//         this.generate = function() {
//             var ts = this.timestamp.toString();
//             var parts = ts.split( "" ).reverse();
//             var id = "";
//
//             for( var i = 0; i < this.length; ++i ) {
//                 var index = _getRandomInt( 0, parts.length - 1 );
//                 id += parts[index];
//             }
//
//             return id;
//         }
//
//
//     }
//
//
//     document.addEventListener( "DOMContentLoaded", function() {
//         var btn = document.querySelector( "#generate" ),
//             output = document.querySelector( "#output" );
//
//         btn.addEventListener( "click", function() {
//             var generator = new IDGenerator();
//             output.innerHTML = generator.generate();
//
//         }, false);
//
//     });
//
//
// })();

function loadAllOrders() {
    $("#orderTable").empty();
    for (var i of orderDB) {
        let row = `<tr><td>${i.orderId}</td><td>${(item).itemCode}</td><td>${i.itemName}</td><td>${i.qtOH}</td><td>${i.price}</td><td>${i.total}</td></tr>`;
        $("#orderTable").append(row);
    }
}

    function saveOrder() {

    let dC = duplicateCheckOrderId();

    if (dC) {
        alert("This OrderId Already Added ,Try Again")
    } else {
        confirm("Do you want to add this Order..?")

        let orderDTO = new OrderDTO(
            $("#txtOrderId").val(),
            $('#selectCusID').val(),
            $("#txtItemName").val(),
            $("#txt-qty").val(),
            $("#txtUnitPrice").val(),
            $("#total").val()
            )
        ;

        var orderObject = {
            orderId: orderDTO.oid,
            itemCode: orderDTO.icode,
            itemName: orderDTO.iname,
            qtOH: orderDTO.qtyOnHnd,
            price: orderDTO.iprice,
            total: orderDTO.cost
        }

        orderDB.push(orderObject)
    }
}


function duplicateCheckOrderId() {
    for (var i = 0; i < orderDB.length; i++) {
        if ($("#txtOrderId").val() === orderDB[i].orderId) {

            return true;
        }
    }
    return false
}


$('#selectCusID').change(function () {
    var customerId = $('#selectCusID').find(":selected").text();
    for (let i = 0; i < customerDB.length; i++) {
        console.log(customerDB[0].id)
        if (customerDB[i].id === customerId) {
            console.log(customerDB[i])
            console.log(customerDB[i].cname)
            $('#txtCusName').val(customerDB[i].name);
            $('#txtAddress').val(customerDB[i].address);
            $('#txtSalary').val(customerDB[i].salary);
        }
    }
});

$('#selectItemCode').change(function () {
    var itemCode = $('#selectItemCode').find(":selected").text();
    for (let i = 0; i < itemDB.length; i++) {
        console.log(itemDB[0].itemCode)
        if (itemDB[i].itemCode === itemCode) {
            console.log(itemDB[i])
            console.log(itemDB[i].cname)
            $('#txtItemName').val(itemDB[i].itemName);
            $('#txtUnitPrice').val(itemDB[i].price);
            $('#txt-qtyOnHand').val(itemDB[i].quantity);
        }
    }
});


const orderIDRegEx = /^(O-)[0-9]{3}$/;
const qtOHRegEx = /^[0-9]{2,}$/;
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

$("#txt-qty").on('keydown', (function (e) {
        let qtyOnHand = $("#txt-qtyOnHand").val();
        let qtyTyped = $("#txt-qty").val() + "0";
        let qtyOnHandNumber = parseInt(qtyOnHand);
        let qtyNumber = parseInt(qtyTyped);
        console.log(qtyTyped)
        if (qtyOnHandNumber < qtyNumber) {
            $("#txt-qty").css('border', '2px solid red');
            $("#lblorderQty").text("insufficient Quantity");
        } else {
            $("#txt-qty").css('border', '2px solid green');
            $("#lblorderQty").text("");
        }
    }
));

$("#txtCash").on('keyup', function (eventOb) {
    setButtonOrder();
    if (eventOb.key === "Enter") {
        checkIfValidOrder();
    }
});

$("#btnPay").attr('disabled', true);

function clearAllOrder() {
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
        $("#lblorderId").text("Order ID is a required field : Pattern O-000");
        return false;
    }
}


function checkIfValidOrder() {
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

function setButtonOrder() {
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