$("#btnAddCustomer").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();

    $("#customerTable>tr").click(function () {
        console.log($(this));
        let id1 = $(this).children(":eq(0)").text();
        let name1 = $(this).children(":eq(1)").text();
        let address1 = $(this).children(":eq(2)").text();
        let salary1 = $(this).children(":eq(3)").text();

        console.log(id1, name1, address1, salary1);

        $("#customerId").val(id1);
        $("#customerName").val(name1);
        $("#customerAddress").val(address1);
        $("#customerSalary").val(salary1);
    });

});


$("#btnSearch").click(function () {
    var searchID = $("#txtSearchCusID").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#customerId").val(response.id);
        $("#customerName").val(response.name);
        $("#customerAddress").val(response.address);
        $("#customerSalary").val(response.salary);
    } else {
        clearAll();
        alert("No Such a Customer");
    }
});

function loadAllCustomers() {
    $("#customerTable").empty();
    for (var i of customerDB) {
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.salary}</td></tr>`;
        $("#customerTable").append(row);
    }
}

function saveCustomer() {
    let customerID = $("#customerId").val();
    let customerName = $("#customerName").val();
    let customerAddress = $("#customerAddress").val();
    let customerSalary = $("#customerSalary").val();

    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    };

    customerDB.push(customerObject);
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}




function deleteCustomer() {
}

function updateCustomer() {

}

const cusIDRegEx = /^(C00-)[0-9]{3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[A-z]{3,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#customerId,#customerName,#customerAddress,#customerSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
    formValidCus();
});

$('#customerId,#customerName,#customerAddress,#customerSalary').on('blur', function () {
    formValidCus();
});

$("#customerId").on('keyup', function (eventOb) {
    setButton();

    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#customerId").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#customerId").val(srcCustomer.getCustomerID());
        $("#customerName").val(srcCustomer.getCustomerName());
        $("#customerAddress").val(srcCustomer.getCustomerAddress());
        $("#customerSalary").val(srcCustomer.getCustomerSalary());
    }


});

$("#customerName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }
});

$("#customerAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }
});

$("#customerSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValidCus();
    }
});

$("#btnAddCustomer").attr('disabled', true);

function clearAll() {
    $('#customerId,#customerName,#customerAddress,#customerSalary').val("");
    $('#customerId,#customerName,#customerAddress,#customerSalary').css('border', '2px solid #ced4da');
    $('#customerId').focus();
    $("#btnAddCustomer").attr('disabled', true);
    loadAllCustomers();
    $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
}

function formValidCus() {
    var cusID = $("#customerId").val();
    $("#customerId").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#customerName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customerName").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#customerAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#customerSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#customerAddress").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#customerSalary").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#customerSalary").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#customerAddress").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Address is a required field : Mimum 3");
                return false;
            }
        } else {
            $("#customerName").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#customerId").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValidCus() {
    var cusID = $("#customerId").val();
    if (cusIDRegEx.test(cusID)) {
        $("#customerName").focus();
        var cusName = $("#customerName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#customerAddress").focus();
            var cusAddress = $("#customerAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#customerSalary").focus();
                var cusSalary = $("#customerSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#customerSalary").focus();
                }
            } else {
                $("#customerAddress").focus();
            }
        } else {
            $("#customerName").focus();
        }
    } else {
        $("#customerId").focus();
    }
}

function setButton() {
    let b = formValidCus();
    if (b) {
        $("#btnAddCustomer").attr('disabled', false);
    } else {
        $("#btnAddCustomer").attr('disabled', true);
    }
}

$('#btnAddCustomer').click(function () {
    checkIfValidCus();
});




//bind the events to the table rows after the row was added
// $("#customerTable>tr").click(function () {
//     // this//dom object
//     // $(this);//jQuery object
//
//     // $(this)//tr
//     // $(this).children(); //return all td inside selected row
//     let cusID = $(this).children(":eq(0)").text(); // select first td and get text
//     let cusName = $(this).children(":eq(1)").text();
//     let cusAddress = $(this).children(":eq(2)").text();
//     let cusTP = $(this).children(":eq(3)").text();
//
//     console.log(cusID, cusName, cusAddress, cusTP);
//
//     // set values for the input fields
//     $("#txtCusID").val(cusID);
//     $("#txtCusName").val(cusName);
//     $("#txtCusAddress").val(cusAddress);
//     $("#txtCusTP").val(cusTP);
//
// });


// /*Remove selected row from the double click*/
// $("#customerTable>tr").dblclick(function () {
//     $(this).remove();
// });
//
// });