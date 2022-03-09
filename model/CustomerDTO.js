function CustomerDTO(customerId,customerName,customerAddress,salary) {
    var __customerId=customerId;
    var __customerName=customerName;
    var __customerAddress=customerAddress;
    var __salary=salary;

    this.getCustomerId = function () {
        return __customerId;
    }
    this.setCustomerId = function (v) {
        __customerId = v;
    }
    this.getCustomerName = function () {
        return __customerName;
    }
    this.setCustomerName = function (v) {
        __customerName = v;
    }
    this.getCustomerAddress = function () {
        return __customerAddress;
    }
    this.setCustomerAddress = function (v) {
        __customerAddress = v;
    }
    this.getCustomerSalary= function () {
        return __customerSalary;
    }
    this.setCustomerSalary = function (v) {
        __customerSalary = v;
    }

}

// var cc = new CustomerDTO("C001", "Dasun", "Galle", 1000);
// cc.id; // not allowed
// cc.setCustomerID("C004"); // ok
// cc.getCustomerID(); // ok
