$("#btnAddItem").click(function () {
    saveItem();
    clearAllItems();
    loadAllItems();

    $("#itemTable>tr").click(function () {
        console.log($(this));
        let itemCode1 = $(this).children(":eq(0)").text();
        let itemName1 = $(this).children(":eq(1)").text();
        let itemPrice1 = $(this).children(":eq(2)").text();
        let itemQuantity1 = $(this).children(":eq(3)").text();

        console.log(itemCode1, itemName1, itemPrice1, itemQuantity1);

        $("#itemCode").val(itemCode1);
        $("#itemName").val(itemName1);
        $("#itemPrice").val(itemPrice1);
        $("#itemQuantity").val(itemQuantity1);
    });
});

$("#btnSearchItem").click(function () {
    var searchID = $("#txtSearchItemCode").val();

    var response = searchItem(searchID);
    if (response) {
        $("#itemCode").val(response.itemCode);
        $("#itemName").val(response.itemName);
        $("#itemPrice").val(response.price);
        $("#itemQuantity").val(response.quantity);
    }else{
        clearAllItems();
        alert("No Such a Item");
    }
});

function loadAllItems() {
    $("#itemTable").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.price}</td><td>${i.quantity}</td></tr>`;
        $("#itemTable").append(row);
    }
}

function saveItem() {
    let itemCode = $("#itemCode").val();
    let itemName = $("#itemName").val();
    let itemPrice = $("#itemPrice").val();
    let itemQuantity = $("#itemQuantity").val();

    var itemObject = {
        itemCode: itemCode,
        itemName: itemName,
        price: itemPrice,
        quantity: itemQuantity
    };

    itemDB.push(itemObject);
}



function searchItem(itemCode) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].itemCode == itemCode) {
            return itemDB[i];
        }
    }
}

// $(document).ready(function () {
//     $('#btnDeleteItem').click(function () {
//         if (confirm("Want to clear?")) {
//             $('#form input[type="text"]').val('');
//             $('#form #itemCode').val('');
//             $('#form #itemName').val('');
//             $('#form #itemPrice').val('');
//             $('#form #itemQuantity').val('');
//         }
//
//     });
// });

function deleteItem(){

}

function updateCustomer(){

}

const itemCodeRegEx = /^(I00-)[0-9]{3}$/;
const itemNameRegEx = /^[A-z ]{2,20}$/;
const itemPriceRegEx = /^[0-9]{2,}$/;
const itemQuantityRegEx = /^[0-9 A-z]{2,}$/;


$('#itemCode,#itemName,#itemPrice,#itemQuantity').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#itemCode,#itemName,#itemPrice,#itemQuantity').on('blur', function () {
    formValidItem();
});

$("#itemCode").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }

    if (eventOb.key == "Control") {
        var typedItemCode = $("#itemCode").val();
        var srcItem = searchItemFromCode(typedItemCode);
        $("#itemCode").val(srcItem.getItemCode());
        $("#itemName").val(srcItem.getItemName());
        $("#itemPrice").val(srcItem.getItemPrice());
        $("#itemQuantity").val(srcItem.getItemQuantity());
    }


});

$("#itemName").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#itemPrice").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#itemQuantity").on('keyup', function (eventOb) {
    setButtonItem();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#btnAddItem").attr('disabled', true);

function clearAllItems() {
    $('#itemCode,#itemName,#itemPrice,#itemQuantity').val("");
    $('#itemCode,#itemName,#itemPrice,#itemQuantity').css('border', '2px solid #ced4da');
    $('#itemCode').focus();
    $("#btnAddItem").attr('disabled', true);
    loadAllItems();
    $("#lblitemcode,#lblitemname,#lblitemprice,#lblitemquantity").text("");
}

function formValidItem() {
    var itemCode = $("#itemCode").val();
    $("#itemCode").css('border', '2px solid green');
    $("#lblitemcode").text("");
    if (itemCodeRegEx.test(itemCode)) {
        var itemName = $("#itemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#itemName").css('border', '2px solid green');
            $("#lblitemname").text("");
            var itemPrice = $("#itemPrice").val();
            if (itemPriceRegEx.test(itemPrice)) {
                var itemQty = $("#itemQuantity").val();
                var resp = itemQuantityRegEx.test(itemQty);
                $("#itemPrice").css('border', '2px solid green');
                $("#lblitemprice").text("");
                if (resp) {
                    $("#itemQuantity").css('border', '2px solid green');
                    $("#lblitemquantity").text("");
                    return true;
                } else {
                    $("#itemQuantity").css('border', '2px solid red');
                    $("#lblitemquantity").text("Item qty is a required field : Pattern 500g or 1kg");
                    return false;
                }
            } else {
                $("#itemPrice").css('border', '2px solid red');
                $("#lblitemprice").text("Item Price is a required field : Mimum 3");
                return false;
            }
        } else {
            $("#itemName").css('border', '2px solid red');
            $("#lblitemname").text("Item Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#itemCode").css('border', '2px solid red');
        $("#lblitemcode").text("Item Code is a required field : Pattern I00-000");
        return false;
    }
}

function checkIfValidItem() {
    var itemCode = $("#itemCode").val();
    if (itemCodeRegEx.test(itemCode)) {
        $("#itemName").focus();
        var itemName = $("#itemName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#itemPrice").focus();
            var itemPrice = $("#itemPrice").val();
            if (itemPriceRegEx.test(itemPrice)) {
                $("#itemQuantity").focus();
                var itemQty = $("#itemQuantity").val();
                var resp = itemQuantityRegEx.test(itemQty);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        saveItem();
                        clearAllItems();
                    }
                } else {
                    $("#itemQuantity").focus();
                }
            } else {
                $("#itemPrice").focus();
            }
        } else {
            $("#itemName").focus();
        }
    } else {
        $("#itemCode").focus();
    }
}

function setButtonItem() {
    let b = formValidItem();
    if (b) {
        $("#btnAddItem").attr('disabled', false);
    } else {
        $("#btnAddItem").attr('disabled', true);
    }
}

$('#btnAddItem').click(function () {
    checkIfValidItem();
});